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
  fetchLogsByStatusId,
} from "../../../../api/admin/productApi";
import Modal from "../../../../component/admin/modal/Modal";
import NewProduct from "../../products/newProduct/NewProduct";
import ProductStatusLog from "../prodcutStatusLog/ProductStatusLog";
import { RentalProduct } from "../rentalProduct/RentalProduct";


export default function ProductList() {
  const { facility_id } = useParams();
  const [data, setData] = useState([]);
  const [modifiedData, setModifiedData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [statusLogs, setStatusLogs] = useState({});
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [reloadGraphData, setReloadGraphData] = useState(null);
  const [inputValues, setInputValues] = useState({});



  // 데이터 로드
  const fetchData = async () => {
    try {
      // 물품 상태 데이터 가져오기
      const response = await fetchProductStatusByFacility(facility_id);

      // 상태 ID별 로그 데이터 가져오기
      const logsPromises = response.map(async (item) => {
        const logs = await fetchLogsByStatusId(item.status_id);
        return { ...item, logs }; // 상태 데이터에 로그를 추가
      });

      // 모든 상태 및 로그 데이터를 병합
      const transformedData = await Promise.all(logsPromises);

      // 데이터 상태 업데이트
      const finalData = transformedData.map((item) => ({
        id: item.status_id,
        status_id: item.status_id,
        product_id: item.product_id,
        product_name: item.product_name || "N/A",
        size: item.size || "N/A",
        stock: item.stock || 0,
        availableStock: item.stock - (item.logs.reduce((sum, log) => sum + log.change_quantity, 0) || 0),
        current_status: item.current_status || "대여 가능",
        changed_status: item.changed_status || null,
        change_quantity: item.change_quantity || 0,
        updated_at: item.updated_at,
        logs: item.logs || [],
      }));

      setData(finalData);
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

    if (quantity < 0) {
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

  // 로그 표시 및 복구 처리
  const handleRecovery = async (statusId) => {
    try {
      // 상태 복구 요청
      await restoreToAvailable(statusId);

      // 데이터 동기화
      await fetchData(); // 테이블 데이터 다시 로드
      reloadGraphData?.(); // 그래프 데이터 갱신

      // 복구 후 로그 데이터 갱신
      const updatedLogs = await fetchLogsByStatusId(statusId);
      setSelectedLogs(updatedLogs); // 최신 로그 데이터 반영

      alert("상태 복구 완료!");
    } catch (error) {
      console.error("복구 실패:", error.message);
      alert("복구 중 오류가 발생했습니다.");
    }
  };


  // 상태 변경 로그 조회
  const loadLogsForStatus = async (statusId) => {
    try {
      const logs = await fetchLogsByStatusId(statusId);
      setStatusLogs((prevLogs) => ({
        ...prevLogs,
        [statusId]: logs,
      }));
    } catch (error) {
      console.error("로그 조회 실패:", error.message);
    }
  };

  const handleInputChange = (productId, value) => {
    setInputValues((prev) => ({
      ...prev,
      [productId]: value,
    }));
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
      const response = await updateProductStock(productId, newStock); // 서버 API 호출

      if (response.status === 200) {
        // 상태 업데이트: 서버에서 최신 데이터를 반영하여 재고량 계산
        setData((prevData) =>
          prevData.map((item) =>
            item.product_id === productId
              ? {
                ...item,
                stock: newStock,
                availableStock:
                  newStock -
                  (item.logs.reduce((sum, log) => sum + log.change_quantity, 0) || 0),
              }
              : item
          )
        );

        // 입력 필드 초기화
        setInputValues((prev) => ({
          ...prev,
          [productId]: "",
        }));

        alert("총량 수정이 완료되었습니다.");
      } else {
        alert("서버 응답 실패: " + response.statusText);
      }
    } catch (error) {
      console.error("총량 수정 실패:", error.message);
      alert("총량 수정 중 오류가 발생했습니다.");
    }
  };


  // 상태 변경 및 로그 반영
  const handleStatusAdjustment = async (statusId, changedStatus, changeQuantity) => {
    const product = data.find((item) => item.status_id === statusId);

    if (!product) {
      console.error("상품을 찾을 수 없습니다.");
      return;
    }

    try {
      // 상태 변경 요청
      await updateProductStatus(statusId, changedStatus, changeQuantity);

      // 데이터 동기화
      await fetchData(); // 최신 데이터를 다시 로드
      reloadGraphData?.(); // 그래프 데이터 갱신

      // 수량 입력 필드 초기화
      setModifiedData((prev) => ({
        ...prev,
        [statusId]: {
          current_status: "",
          changed_status: "",
          change_quantity: 0,
        },
      }));

      // 입력 필드 초기화 (상태 기반으로)
      setInputValues((prev) => ({
        ...prev,
        [statusId]: "",
      }));

      alert("상태 변경 및 로그 기록 완료!");
    } catch (error) {
      console.error("상태 변경 실패:", error.message);
      alert("상태 변경 중 오류가 발생했습니다.");
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

  const handleLogView = async (statusId) => {
    try {
      const logs = await fetchLogsByStatusId(statusId); // API 호출
      setSelectedLogs(logs); // 가져온 로그 데이터 저장
      setLogModalOpen(true); // 모달 열기
    } catch (error) {
      console.error("로그 조회 실패:", error.message);
    }
  };

  const closeLogModal = () => {
    setSelectedLogs([]);
    setLogModalOpen(false); // 모달 닫기
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
    {
      field: "status_id",
      headerName: "상태 ID",
      width: 180,
      headerAlign: "center", // 헤더 중앙 정렬
      align: "center", // 데이터 중앙 정렬
    },
    {
      field: "product_name",
      headerName: "상품명",
      width: 120,
      headerAlign: "center",
      align: "left", // 텍스트 왼쪽 정렬
    },
    {
      field: "size",
      headerName: "사이즈",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock",
      headerName: "총량 (재고량)",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        `${params.row.stock} (재고량: ${params.row.availableStock})`,
    },
    {
      field: "stock_adjustment",
      headerName: "총량 증감",
      width: 190,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="stockAdjustmentCell">
          <input
            type="number"
            className="quantityInput"
            placeholder="수량 입력"
            value={inputValues[params.row.product_id] || ""}
            onChange={(e) => handleInputChange(params.row.product_id, e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            className="applyButton"
            onClick={() => handleStockAdjustment(params.row.product_id, inputValues[params.row.product_id])}
          >
            적용
          </Button>
        </div>
      ),
    },
    {
      field: "product_status",
      headerName: "상태 변경",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const currentStatus =
          modifiedData[params.row.status_id]?.changed_status ||
          params.row.changed_status ||
          "";

        return (
          <div className="statusChangeCell">
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

            <input
              type="number"
              className="quantityInput"
              min="0"
              placeholder="수량 입력"
              value={inputValues[params.row.status_id] || ""}
              onChange={(e) =>
                handleInputChange(params.row.status_id, e.target.value)
              }
            />

            <button
              onClick={() => {
                const changedStatus =
                  modifiedData[params.row.status_id]?.changed_status ||
                  params.row.changed_status;
                const changeQuantity =
                  inputValues[params.row.status_id] || 0;

                if (!changedStatus) {
                  alert("상태를 선택해주세요.");
                  return;
                }

                handleStatusAdjustment(
                  params.row.status_id,
                  changedStatus,
                  parseInt(changeQuantity)
                );
              }}
              className="saveButton"
            >
              저장
            </button>
          </div>
        );
      },
    },
    {
      field: "updated_at",
      headerName: "마지막 수정일",
      width: 220,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.row.updated_at
          ? new Date(params.row.updated_at).toLocaleString()
          : "N/A",
    },
    {
      field: "action",
      headerName: "작업",
      width: 220,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="productAction">
          <Link to={`/admin/products/${facility_id}/read/${params.row.product_id}`}>
            <button className="productListEdit">상품 조회</button>
          </Link>

          <button
            className="logViewButton"
            onClick={() => handleLogView(params.row.status_id)}
          >
            로그 조회
          </button>

        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

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
            일괄 저장
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
      <RentalProduct
        facilityId={facility_id}
        onDataReload={(reloadFn) => setReloadGraphData(() => reloadFn)}
      />
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        onCellClick={handleRowClick} // 추가
        getRowId={(row) => row.id}
        className="productTable"
        rowHeight={60} // 모든 행의 높이를 60px로 통일
        onSelectionModelChange={(selection) => setSelectedRowKeys(selection)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 30, 50, 100]} // 선택 가능한 페이지 크기 옵션 추가
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
      {logModalOpen && (
        <Modal
          content={<ProductStatusLog logs={selectedLogs} onRestore={handleRecovery} />}
          callbackFn={closeLogModal}
        />
      )}
    </div>
  );
}
