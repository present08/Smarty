import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductStatusByFacility, updateProductStatus, updateProductStock } from "../../../../api/admin/productApi";

export default function ProductList() {
  const { facility_id } = useParams(); // URL에서 facility_id 가져오기
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.status_id !== id));
  };

  const handleStatusChange = (statusId, newStatus) => {
    updateProductStatus(statusId, newStatus)
      .then(() => {
        setData(data.map(item =>
          item.status_id === statusId ? { ...item, product_status: newStatus } : item
        ));
      })
      .catch(error => console.error("상태 업데이트 실패:", error));
  };

  const handleStockChange = (statusId, change) => {
    const product = data.find(item => item.status_id === statusId);
    if (!product) return;

    const newStock = (product.stock || 0) + change;

    if (newStock < 0) {
      alert("재고가 부족하여 감소할 수 없습니다.");
      return;
    }

    updateProductStock(statusId, newStock) // `status_id`를 기반으로 API 호출
      .then(() => {
        setData(data.map(item =>
          item.status_id === statusId ? { ...item, stock: newStock } : item
        ));
      })
      .catch(error => console.error("재고 업데이트 실패:", error));
  };

  useEffect(() => {
    if (facility_id) {
      // 특정 시설에 대한 물품 상태 데이터만 가져오기
      fetchProductStatusByFacility(facility_id)
        .then((response) => {
          setData(response.data);
          console.log(`물품 상태 목록 (시설 ID: ${facility_id}): `, response.data);
        })
        .catch((error) => console.error("특정 시설 물품 상태 조회 실패:", error));
    }
  }, [facility_id]);

  const columns = [
    { field: "status_id", headerName: "상태 ID", width: 120 },
    { field: "product_name", headerName: "물품명", width: 160 },
    { field: "stock", headerName: "재고", width: 120 },
    {
      field: "product_status",
      headerName: "상태",
      width: 200,
      renderCell: (params) => (
        <select
          value={params.row.product_status || "대여 가능"}
          onChange={(e) => handleStatusChange(params.row.status_id, e.target.value)}
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
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <div className="productAction">
          <Link to={`/products/read/${params.row.product_id}`}>
            <button className="productListEdit">Edit</button>
          </Link>
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
            onClick={() => handleDelete(params.row.status_id)}
          />
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="productList">
      <div className="productContainer">
        <div className="productTitle">물품 목록 (시설 ID: {facility_id})</div>
        <DataGrid
          className="productTable"
          rows={data}
          disableRowSelectionOnClick
          columns={columns}
          getRowId={(row) => row.status_id} // status_id를 기반으로 행 식별
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </div>
    </div>
  );
}
