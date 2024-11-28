import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Stack, } from "@mui/material";
import * as XLSX from "xlsx";
import { fetchProductStatusByFacility, restoreToAvailable, updateProductStatus, updateProductStock } from "../../../../api/admin/productApi";
import NewProduct from "../../products/newProduct/NewProduct"; // NewProduct import
import Modal from "../../../../component/admin/modal/Modal"; // Modal 컴포넌트 import

export default function ProductList() {
  const { facility_id } = useParams();
  const [data, setData] = useState([]);
  const [modifiedData, setModifiedData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPageRows, setCurrentPageRows] = useState([]);
  const [productModalOpen, setProductModalOpen] = useState(false); // 모달 상태 추가
  const [changeQuantity, setChangeQuantity] = useState({}); // 상태 변경 수량 저장
  const [stockChange, setStockChange] = useState({}); // 재고 증가/감소 UI 데이터

  // 데이터 로드
  const fetchData = () => {
    if (!facility_id) return;
  
    fetchProductStatusByFacility(facility_id)
      .then((response) => {
        if (!response || response.length === 0) {
          throw new Error("응답 데이터가 없습니다.");
        }
  
        const transformedData = response.map((item) => {
          const statusList = item.statusList || []; // 상태 목록
          const availableStock = statusList.find((status) => status.status === "대여 가능")?.quantity || 0;
  
          return {
            ...item,
            id: item.status_id, // DataGrid에서 요구하는 고유 ID
            statusList,
            availableStock, // 대여 가능 수량 추가
            size: item.size || "N/A",
          };
        });
  
        setData(transformedData);
      })
      .catch((error) => console.error("특정 시설 물품 상태 조회 실패:", error.message));
  };
  
  

  useEffect(() => {
    fetchData();
  }, [facility_id]);

  useEffect(() => {
    console.log("데이터 상태 변경 감지:", data);
  }, [data]);

  
  // ** 상태 변경 처리
  const handleStatusChange = (statusId, newStatus, quantity = 0) => {
    setModifiedData((prev) => {
      const currentData = prev[statusId] || {};
      const productData = data.find((item) => item.status_id === statusId);
      const currentAvailableStock = currentData.availableStock || productData?.availableStock || 0;
  
      let newAvailableStock = currentAvailableStock;
      const updatedStatusList = [...(currentData.statusList || productData?.statusList || [])];
  
      if (newStatus !== "대여 가능") {
        newAvailableStock = Math.max(0, currentAvailableStock - quantity);
  
        // 상태 업데이트: 기존 상태를 업데이트하거나 새로 추가
        const statusIndex = updatedStatusList.findIndex((status) => status.status === newStatus);
        if (statusIndex !== -1) {
          updatedStatusList[statusIndex].quantity = quantity;
        } else {
          updatedStatusList.push({ status: newStatus, quantity });
        }
      } else {
        // 대여 가능 상태로 복구 시 기존 상태 제거
        const statusIndex = updatedStatusList.findIndex((status) => status.status !== "대여 가능");
        if (statusIndex !== -1) {
          updatedStatusList.splice(statusIndex, 1);
        }
      }
  
      // 상태 및 수량 업데이트
      return {
        ...prev,
        [statusId]: {
          ...currentData,
          product_status: newStatus,
          quantity,
          availableStock: newAvailableStock,
          statusList: updatedStatusList,
        },
      };
    });
  }
  
  // 저장 후 UI 업데이트
  const updateRowData = (statusId, updatedFields) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.status_id === statusId ? { ...item, ...updatedFields } : item
      )
    );
  };

// ** 재고 변경 처리
const handleStockChange = (statusId, change) => {
  setModifiedData((prev) => {
    const currentData = prev[statusId] || {};
    const productData = data.find((item) => item.status_id === statusId);
    const currentStock = currentData.stock || productData?.stock || 0;
    const newStock = Math.max(0, currentStock + change);

    return {
      ...prev,
      [statusId]: {
        ...currentData,
        stock: newStock,
      },
    };
  });

  // UI 업데이트: 테이블에서 변경된 값을 즉시 반영
  const productData = data.find((item) => item.status_id === statusId);
  const currentStock = productData?.stock || 0;
  updateRowData(statusId, { stock: Math.max(0, currentStock + change) });
};

  
  //개별 저장 로직
  const handleSaveRow = async (statusId) => {
    const product = data.find((item) => item.status_id === statusId);
    const changes = modifiedData[statusId] || {};
  
    const newStatus = changes.product_status || product.product_status;
    const quantityChange = changes.quantity || 0; // 입력된 수량
    const newAvailableStock = product.availableStock  - quantityChange; // 대여 가능 수량 계산
    
    const promises = [];
  
     // 상태 변경
  if (newStatus !== product.product_status) {
    promises.push(updateProductStatus(statusId, newStatus));
  }

  promises.push(updateProductStock(product.product_id, newAvailableStock));

   // 수량 변경
   if (quantityChange > 0 && newAvailableStock >= 0) {
    promises.push(updateProductStock(product.product_id, newAvailableStock));
  } else if (newAvailableStock < 0) {
    alert("대여 가능 수량이 0보다 작아질 수 없습니다.");
    return;
  }

  if (promises.length === 0) {
    alert("변경된 값이 없습니다.");
    return;
  }

  try {
    await Promise.all(promises);
    alert("변경 사항이 저장되었습니다.");

    updateRowData(statusId, {
      product_status: "======", // 기본값으로 초기화
      availableStock: newAvailableStock,
    });

    setModifiedData((prev) => {
      const updated = { ...prev };
      delete updated[statusId];
      return updated;
    });
  } catch (error) {
    console.error("저장 실패:", error);
  }
  };

  //일괄 저장 로직
  const handleBulkSaveChanges = async () => {
    const promises = selectedRowKeys.map((key) => {
      const changes = modifiedData[key] || {};
      const product = data.find((item) => item.status_id === key);
  
      const newStatus = changes.product_status || product.product_status;
      const quantityChange = changes.quantity || 0;
      const newAvailableStock = product.stock - quantityChange;
  
      const updates = [];
  
      if (newStatus !== product.product_status) {
        updates.push(updateProductStatus(key, newStatus));
      }
  
      if (quantityChange > 0 && newAvailableStock >= 0) {
        updates.push(updateProductStock(product.product_id, newAvailableStock));
      } else if (newAvailableStock < 0) {
        alert("대여 가능 수량이 0보다 작아질 수 없습니다.");
        return Promise.reject("수량 오류");
      }
  
      return Promise.all(updates);
    });
  
    try {
      await Promise.all(promises);
      alert("일괄 변경 사항이 저장되었습니다.");
      fetchData();
    } catch (error) {
      console.error("일괄 저장 실패:", error);
    }
  };

  const handleRestoreToAvailable = (statusId, quantity) => {
    setModifiedData((prev) => {
      const currentData = prev[statusId] || {};
      const currentAvailableStock = currentData.availableStock || data.find((item) => item.status_id === statusId)?.availableStock || 0;
  
      const restoredStock = Math.min(currentData.stock || 0, currentAvailableStock + quantity);
  
      return {
        ...prev,
        [statusId]: {
          ...currentData,
          product_status: "대여 가능", // 상태 복구
          availableStock: restoredStock, // 대여 가능 수량 업데이트
          quantity: 0, // 복구 후 수량 초기화
        },
      };
    });
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
    { field: "status_id", headerName: "상태 ID", width: 150 },
    { field: "product_name", headerName: "상품명", width: 160 },
    
    {
      field: "stock",
      headerName: "총량 (대여 가능)",
      width: 200,
      renderCell: (params) => {
       const modifiedStock =
        modifiedData[params.row.status_id]?.stock || params.row.stock || 0;
      const modifiedAvailableStock =
          modifiedData[params.row.status_id]?.availableStock || params.row.availableStock || modifiedStock;
        
        return (
          <div>
          {modifiedStock} (대여 가능: {modifiedAvailableStock})
        </div>
        );
      },
    },
    
      {
        field: "statusList",
        headerName: "상태 및 수량",
        width: 300,
        renderCell: (params) => {
          const statusList = modifiedData[params.row.status_id]?.statusList || params.row.statusList || [];
          return (
            <div>
              {statusList.length > 0 ? (
                statusList.map((status) => (
                  <div key={status.status}>
                    {status.status}: {status.quantity || 0}개
                    {status.status !== "대여 가능" && (
                      <button
                        className="restoreButton"
                        onClick={() =>
                          handleRestoreToAvailable(params.row.status_id, status.quantity || 0)
                        }
                      >
                        복구
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div>상태 정보 없음</div>
              )}
            </div>
          );
        },
      },
      {
        field: "product_status",
        headerName: "상태 변경",
        width: 300,
        renderCell: (params) => {
          const currentStatus =
            modifiedData[params.row.status_id]?.product_status || params.row.product_status || "대여 가능";
          const quantity =
            modifiedData[params.row.status_id]?.quantity || params.row.quantity || 0;
    
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              {/* 상태 변경 Select */}
              <select
                className="statusSelect"
                value={currentStatus}
                onChange={(e) =>
                  handleStatusChange(
                    params.row.status_id,
                    e.target.value,
                    quantity // 수량과 동기화
                  )
                }
              >
                <option value="======">======</option>
                {["손상", "수리 필요", "재구매 필요"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
    
              {/* 수량 입력 Input */}
              <input
                type="number"
                min="0"
                className="quantityInput"
                value={quantity}
                onChange={(e) =>
                  handleStatusChange(
                    params.row.status_id,
                    currentStatus,
                    Number(e.target.value) // 수량 변경
                  )
                }
                placeholder="수량 입력"
              />
            </Stack>
          );
        },
      },
    {
      field: "action",
      headerName: "작업",
      width: 350,
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
      width: 200,
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
          rows={data || []} // 데이터가 없으면 빈 배열을 전달
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
