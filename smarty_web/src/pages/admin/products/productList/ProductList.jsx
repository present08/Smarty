import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import {
  fetchProductStatusByFacility,
  updateProductStatus,
  restoreToAvailable,
  updateProductStock,
} from "../../../../api/admin/productApi";
import Modal from "../../../../component/admin/modal/Modal";
import NewProduct from "../../products/newProduct/NewProduct";

export default function ProductList() {
  const { facility_id } = useParams();
  const [data, setData] = useState([]);
  const [modifiedData, setModifiedData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [statusLogs, setStatusLogs] = useState({});


  // 데이터 로드
  const fetchData = async () => {
    try {
      const response = await fetchProductStatusByFacility(facility_id);
      const transformedData = response.map((item) => ({
        id: item.status_id,
        status_id: item.status_id,
        product_id: item.product_id,
        product_name: item.product_name || "N/A",
        size: item.size || "N/A",
        stock: item.stock || 0,
        availableStock: item.stock - (item.logs?.reduce((sum, log) => sum + log.quantity, 0) || 0),
        current_status: item.current_status || "대여 가능",
        changed_status: item.changed_status || null,
        change_quantity: item.change_quantity || 0,
        updated_at: item.updated_at,
        logs: item.logs || [],
      }));
      setData(transformedData);
    } catch (error) {
      console.error("데이터 로드 실패:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [facility_id]);

  // 체크박스 문제 해결: 열 클릭 방지
const handleRowClick = (params, event) => {
  event.stopPropagation(); // 열 클릭 이벤트 차단
};

  // 상태 변경 및 수량 입력 처리
  const handleStatusChange = (statusId, newStatus, quantity) => {
    const product = data.find((item) => item.status_id === statusId);

    if (!product) {
      console.error("상품을 찾을 수 없습니다.");
      return;
    }

    if (!newStatus) {
      alert("상태를 선택해주세요.");
      return;
    }

    if (quantity <= 0) {
      alert("수량은 0보다 커야 합니다.");
      return;
    }

    const newAvailableStock = product.stock - quantity;

    if (newAvailableStock < 0) {
      alert("대여 가능 수량이 0보다 작아질 수 없습니다.");
      return;
    }

    setModifiedData((prev) => ({
      ...prev,
      [statusId]: {
        current_status: product.current_status,
        changed_status: newStatus,
        change_quantity: quantity,
      },
    }));

    setData((prevData) =>
      prevData.map((item) =>
        item.status_id === statusId
          ? {
              ...item,
              changed_status: newStatus,
              change_quantity: quantity,
              availableStock: newAvailableStock,
            }
          : item
      )
    );
  };

  // 수량 입력 핸들러
  const handleQuantityChange = (statusId, quantity) => {
    const product = data.find((item) => item.status_id === statusId);

    if (!product) {
      alert("상품을 찾을 수 없습니다.");
      return;
    }

    if (quantity <= 0) {
      alert("수량은 0보다 커야 합니다.");
      return;
    }

    setModifiedData((prev) => ({
      ...prev,
      [statusId]: {
        ...prev[statusId],
        change_quantity: quantity,
      },
    }));
  };

  // 복구 처리
  const handleRecovery = async (statusId) => {
    try {
      await restoreToAvailable(statusId);

      setData((prevData) =>
        prevData.map((item) =>
          item.status_id === statusId
            ? {
                ...item,
                changed_status: null,
                change_quantity: 0,
                availableStock: item.stock,
                current_status: "대여 가능",
              }
            : item
        )
      );

      alert("복구 성공");
    } catch (error) {
      console.error("복구 실패:", error.message);
    }
  };

   // 전체 수량 증감 처리
   const handleStockAdjustment = async (productId, adjustmentValue) => {
    const product = data.find((item) => item.product_id === productId);

    if (!product) {
      alert("상품을 찾을 수 없습니다.");
      return;
    }

    if (adjustmentValue === "" || isNaN(adjustmentValue)) {
      alert("올바른 수량을 입력하세요.");
      return;
    }

    const newStock = product.stock + parseInt(adjustmentValue);

    if (newStock < 0) {
      alert("총량은 0보다 작을 수 없습니다.");
      return;
    }

    try {
      await updateProductStock(productId, newStock); // 백엔드 API 호출

      // UI 업데이트
      setData((prevData) =>
        prevData.map((item) =>
          item.product_id === productId ? { ...item, stock: newStock } : item
        )
      );
      alert("총량 수정이 완료되었습니다.");
    } catch (error) {
      console.error("총량 수정 실패:", error.message);
      alert("총량 수정 중 오류가 발생했습니다.");
    }
  };

// 개별 저장
const handleSaveRow = async (statusId) => {
  const changes = modifiedData[statusId] || {}; // 수정된 데이터 가져오기
  const product = data.find((item) => item.status_id === statusId); // 대상 상품 찾기

  if (!product) {
    console.error("상품을 찾을 수 없습니다.");
    return;
  }

  try {
    // 상태 변경 저장
    if (changes.product_status) {
      // 상태 변경 시 필요한 데이터 전달
      const changedStatus = changes.product_status;
      const quantity = changes.quantity || 0; // 수량이 없으면 기본값 0

      await updateProductStatus(statusId, changedStatus, quantity);
    }

    // 총량 수정 저장
    if (changes.stock !== undefined) {
      await updateProductStock(product.product_id, changes.stock);
    }

    // 성공 메시지 표시
    alert("저장되었습니다.");

    // 데이터 초기화 및 UI 업데이트
    setData((prevData) =>
      prevData.map((item) =>
        item.status_id === statusId
          ? {
              ...item,
              ...changes,
              availableStock:
                item.stock - (changes.change_quantity || 0), // 대여 가능 수량 업데이트
            }
          : item
      )
    );
    // 수정된 데이터 초기화
    setModifiedData((prev) => {
      const updated = { ...prev };
      delete updated[statusId];
      return updated;
    });
  } catch (error) {
    console.error("저장 실패:", error.message);
    alert("저장 중 오류가 발생했습니다.");
  }
  };
  
      // 일괄 저장
const handleBulkSaveChanges = async () => {
  if (selectedRowKeys.length === 0) {
    alert("저장할 항목을 선택해주세요.");
    return;
  }

  const promises = selectedRowKeys.map((statusId) => {
    const changes = modifiedData[statusId] || {};
    const product = data.find((item) => item.status_id === statusId);

    if (!product) {
      console.error(`상품을 찾을 수 없습니다: ${statusId}`);
      return Promise.resolve(); // 상품이 없으면 무시하고 진행
    }

    const updates = [];

    // 상태 변경 저장
    if (changes.changed_status) {
      updates.push(
        updateProductStatus(statusId, changes.changed_status, changes.change_quantity)
      );
    }

    // 총량 수정 저장
    if (changes.stock !== undefined) {
      updates.push(updateProductStock(product.product_id, changes.stock));
    }

    return Promise.all(updates);
  });

  try {
    await Promise.all(promises);
    alert("선택된 항목이 저장되었습니다.");
    fetchData(); // 데이터를 다시 로드
    setModifiedData({}); // 수정된 데이터 초기화
  } catch (error) {
    console.error("일괄 저장 실패:", error.message);
    alert("일괄 저장 중 오류가 발생했습니다.");
  }
};

  // 엑셀 내보내기
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product Data");
    XLSX.writeFile(workbook, "product_data.xlsx");
    alert("엑셀 파일로 내보내기 완료!");
  };

  const toggleProductModal = () => setProductModalOpen((prev) => !prev);

  const columns = [
    { field: "status_id", headerName: "상태 ID", width: 150 },
    { field: "product_name", headerName: "상품명", width: 150 },
    { field: "size", headerName: "사이즈", width: 80 },
    {
      field: "stock",
      headerName: "총량",
      width: 180,
      renderCell: (params) =>
        `${params.row.stock} (대여 가능 : ${params.row.availableStock})`,
    },
    {
      field: "stock_adjustment",
      headerName: "총량 증감",
      width: 200,
      renderCell: (params) => (
        <div>
          <input
            type="number"
            className="quantityInput"
            placeholder="수량 입력"
            onBlur={(e) =>
              handleStockAdjustment(params.row.product_id, e.target.value)
            }
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => handleStockAdjustment(params.row.product_id, 0)}
          >
            적용
          </Button>
        </div>
      ),
    },
    {
      field: "product_status",
      headerName: "상태 변경 / 수량 입력",
      width: 250,
      renderCell: (params) => {
        const currentStatus =
          modifiedData[params.row.status_id]?.changed_status ||
          params.row.changed_status ||
          "";
    
        return (
          <div className="statusChangeCell">
            {/* 상태 변경 셀렉트 박스 */}
            <select
              className="statusSelect"
              value={currentStatus}
              onChange={(e) =>
                handleStatusChange(params.row.status_id, e.target.value)
              }
            >
              <option value="">상태 선택</option>
              {["손상", "수리 필요", "재구매 필요"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
    
            {/* 수량 입력란 */}
            <input
              type="number"
              className="quantityInput"
              min="1"
              placeholder="수량 입력"
              onChange={(e) => {
                const quantity = Number(e.target.value);
                if (quantity > 0) {
                  handleQuantityChange(params.row.status_id, quantity);
                }
              }}
            />
          </div>
        );
      },
    },
    {
      field: "logs",
      headerName: "상태 변경 로그",
      width: 300,
      renderCell: (params) => {
        const logs = params.row.logs || [];
        return (
          <div>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="logItem">
                  <span className="logText">
                    {log.status} - {log.quantity}개 (
                    {new Date(log.created_at).toLocaleString()})
                  </span>
                  <button
                    onClick={() => handleRecovery(params.row.status_id)}
                    className="recoveryButton"
                  >
                    복구
                  </button>
                </div>
              ))
            ) : (
              "로그 없음"
            )}
          </div>
        );
      },
    },
    {
      field: "updated_at",
      headerName: "마지막 수정일",
      width: 230,
      renderCell: (params) =>
        params.row.updated_at
          ? new Date(params.row.updated_at).toLocaleString()
          : "N/A",
    },
    {
      field: "action",
      headerName: "작업",
      width: 200,
      renderCell: (params) => (
        <div className="productAction">
          <Link to={`/admin/products/${facility_id}/read/${params.row.product_id}`}>
            <button className="productListEdit">상품 조회</button>
          </Link>
          <button
            onClick={() => handleSaveRow(params.row.status_id)}
            className="productListEdit"
          >
            저장
          </button>
        </div>
      ),
    },
  
  ];

  return (
    <div className="productList">
      <Stack direction="row" justifyContent="space-between" className="productContainer">
        <div className="productTitle">물품 목록 (시설 ID: {facility_id})</div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={exportToExcel}
            className="MuiButton-root"
          >
            엑셀 파일로 내보내기
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBulkSaveChanges}
            className="MuiButton-root"
          >
            선택 저장
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleProductModal}
            className="MuiButton-root"
          >
            상품 추가
          </Button>
        </div>
      </Stack>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        onCellClick={handleRowClick} // 추가
        getRowId={(row) => row.id}
        className="productTable"
        onSelectionModelChange={(selection) => setSelectedRowKeys(selection)}
      />
      {productModalOpen && (
        <Modal
          content={
            <NewProduct
              facilityId={facility_id}
              context="productList"
              onClose={toggleProductModal}
            />
          }
          callbackFn={toggleProductModal}
        />
      )}
    </div>
  );
}
