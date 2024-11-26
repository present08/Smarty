import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import { fetchProductStatusByFacility, updateProductStatus, updateProductStock } from "../../../../api/admin/productApi";
import NewProduct from "../../products/newProduct/NewProduct"; // NewProduct import
import Modal from "../../../../component/admin/modal/Modal"; // Modal 컴포넌트 import

export default function ProductList() {
  const { facility_id } = useParams();
  const [data, setData] = useState([]);
  const [modifiedData, setModifiedData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPageRows, setCurrentPageRows] = useState([]);
  const [productModalOpen, setProductModalOpen] = useState(false); // 모달 상태 추가

  // 데이터 로드
  const fetchData = () => {
    if (facility_id) {
      fetchProductStatusByFacility(facility_id)
        .then((response) => {
          setData(response.data);
          setModifiedData({});
        })
        .catch((error) => console.error("특정 시설 물품 상태 조회 실패:", error));
    }
  };

  useEffect(() => {
    fetchData();
  }, [facility_id]);

  // 상태 변경 처리
  const handleStatusChange = (statusId, newStatus) => {
    setModifiedData((prev) => ({
      ...prev,
      [statusId]: { ...prev[statusId], product_status: newStatus },
    }));
  };

  // 저장 후 UI 업데이트
  const updateRowData = (statusId, updatedFields) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.status_id === statusId ? { ...item, ...updatedFields } : item
      )
    );
  };

  // 재고 변경 처리
  const handleStockChange = (statusId, change) => {
    const product = data.find((item) => item.status_id === statusId);
    const currentStock = modifiedData[statusId]?.stock ?? product.stock;
    const newStock = currentStock + change;

    if (newStock < 0) {
      alert("재고가 부족하여 감소할 수 없습니다.");
      return;
    }

    setModifiedData((prev) => ({
      ...prev,
      [statusId]: { ...prev[statusId], stock: newStock },
    }));
  };

  //개별 저장 로직
  const handleSaveRow = async (statusId) => {
    const product = data.find((item) => item.status_id === statusId);
    const changes = modifiedData[statusId] || {};
  
    const newStatus = changes.product_status ?? "대여 가능";
    const currentStatus = product.product_status;
    const newStock = changes.stock ?? product.stock;
  
    console.log("Before Update:", {
      statusId,
      productId: product.product_id,
      currentStatus,
      newStatus,
      currentStock: product.stock,
      newStock,
    });
    
    const promises = [];
  
    if (product.managementType === "개별 관리") {
      if (newStatus !== currentStatus) {
        promises.push(updateProductStatus(statusId, newStatus));
  
        if (currentStatus === "대여 가능" && newStatus !== "대여 가능") {
          if (product.stock > 0) {
            console.log("Decreasing stock for product:", product.product_id);
            promises.push(updateProductStock(product.product_id, newStock - 1));
          } else {
            alert("재고가 부족하여 상태를 변경할 수 없습니다.");
            return;
          }
        }
  
        if (currentStatus !== "대여 가능" && newStatus === "대여 가능") {
          console.log("Increasing stock for product:", product.product_id);
          promises.push(updateProductStock(product.product_id, newStock + 1));
        }
      }
    } else {
      if (newStatus !== currentStatus) {
        promises.push(updateProductStatus(statusId, newStatus));
      }
  
      if (newStock !== product.stock) {
        promises.push(updateProductStock(product.product_id, newStock));
      }
    }
  
    if (promises.length === 0) {
      alert("변경된 값이 없습니다.");
      return;
    }
  
    try {
      await Promise.all(promises);
  
      console.log("After Update:", {
        statusId,
        productId: product.product_id,
        newStatus,
        updatedStock: newStock,
      });
  
      alert("변경 사항이 저장되었습니다.");
      updateRowData(statusId, { product_status: newStatus, stock: newStock });
  
      setModifiedData((prev) => {
        const updated = { ...prev };
        delete updated[statusId];
        return updated;
      });
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };
  
  // 일괄 저장 처리
  const handleBulkSaveChanges = () => {
    const updates = selectedRowKeys.map((key) => {
      const changes = modifiedData[key] || {};
      const product = data.find((item) => item.status_id === key);

      const newStatus = changes.product_status ?? product.product_status;
      const newStock = changes.stock ?? product.stock;

      const promises = [];
      if (newStatus !== product.product_status) {
        promises.push(updateProductStatus(key, newStatus));
      }
      if (newStock !== product.stock) {
        promises.push(updateProductStock(product.product_id, newStock));
      }

      return Promise.all(promises);
    });

    Promise.all(updates)
      .then(() => {
        alert("선택 항목의 변경 사항이 저장되었습니다.");
        fetchData();
        setSelectedRowKeys([]);
      })
      .catch((error) => console.error("일괄 저장 실패:", error));
  };

  // 엑셀 내보내기
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product Data");
    XLSX.writeFile(workbook, "product_data.xlsx");
    alert("엑셀 파일로 내보내기 완료!");
  };


  // 모달 토글 함수
  const toggleProductModal = () => {
    setProductModalOpen((prev) => !prev);
  };


  // 렌더링 로직 수정
  const columns = [
    { field: "status_id", headerName: "상태 ID", width: 120 },
    { field: "product_name", headerName: "물품명", width: 160 },
    {
      field: "stock",
      headerName: "재고",
      width: 120,
      renderCell: (params) => (
        <div>
          {modifiedData[params.row.status_id]?.stock ?? params.row.stock}
        </div>
      ),
    },
    {
      field: "current_status",
      headerName: "현재 상태",
      width: 200,
      renderCell: (params) => (
        <div>{params.row.product_status || "대여 가능"}</div>
      ),
    },
    {
      field: "product_status",
      headerName: "상태 변경",
      width: 200,
      renderCell: (params) => (
        <select
          value={
            modifiedData[params.row.status_id]?.product_status || "대여 가능"
          }
          onChange={(e) =>
            handleStatusChange(params.row.status_id, e.target.value)
          }
        >
          <option value="대여 가능">대여 가능</option>
          <option value="손상">손상</option>
          <option value="수리 필요">수리 필요</option>
          <option value="재구매 필요">재구매 필요</option>
        </select>
      ),
    },
    {
      field: "action",
      headerName: "작업",
      width: 400,
      renderCell: (params) => (
        <div className="productAction">
          <Link to={`/admin/products/${facility_id}/read/` + params.row.product_id}>
            <button className="productListEdit">상품 조회</button>
          </Link>
          <button
            onClick={() => handleSaveRow(params.row.status_id)}
            className="productListEdit"
          >
            저장
          </button>
          <button
            onClick={() => handleStockChange(params.row.status_id, -1)}
            className="productListEdit"
          >
            재고 감소
          </button>
          <button
            onClick={() => handleStockChange(params.row.status_id, 1)}
            className="productListEdit"
          >
            재고 증가
          </button>
          <DeleteOutline
            className="productListDelete"
            onClick={() =>
              setData((prevData) =>
                prevData.filter((item) => item.status_id !== params.row.status_id)
              )
            }
          />
        </div>
      ),
    },
    {
      field: "updated_at",
      headerName: "마지막 수정일",
      width: 250,
      renderCell: (params) => (
        <div>{params.row.updated_at ? new Date(params.row.updated_at).toLocaleString() : "N/A"}</div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className="productList">
      <div className="productContainer">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <div className="productTitle">
            물품 목록 (시설 ID: {facility_id})
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={exportToExcel}
            >
              엑셀 파일로 내보내기
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBulkSaveChanges}
            >
              선택된 항목 저장
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleProductModal}
            >
              상품 추가
            </Button>
          </div>
        </Stack>
        <DataGrid
          className="productTable"
          rows={data}
          disableRowSelectionOnClick
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const visibleIds = currentPageRows.map((row) => row.status_id);
            const filteredIds = ids.filter((id) => visibleIds.includes(id));
            setSelectedRowKeys(filteredIds);
          }}
          onPageChange={(page) => {
            const start = page * paginationModel.pageSize;
            const end = start + paginationModel.pageSize;
            setCurrentPageRows(data.slice(start, end));
          }}
          getRowId={(row) => row.status_id}
          initialState={{ pagination: { paginationModel } }}
          sx={{ border: 0 }}
        />
      </div>
            {/* 상품 추가 모달 */}
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
