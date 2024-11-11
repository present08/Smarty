import "./productList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListProduct } from "../../../../api/admin/productApi";

export default function ProductList() {

  const [data, setData] = useState([])

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  useEffect(() => {
    getListProduct().then(data => {
      setData(data)
      console.log("물품 목록 : ", data)
    }).catch((error) => console.error("에러 발생 : ", error))
  }, [])


  const columns = [
    { field: 'product_id', headerName: '물품 ID', width: 120 },
    { field: 'facility_id', headerName: '시설 ID', width: 180 },
    { field: 'product_name', headerName: '물품명', width: 160 },
    { field: 'stock', headerName: '재고', width: 120 },
    { field: 'price', headerName: '가격', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productAction">
            <Link to={"/products/read/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        )
      }
    }
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="productList">
      <div className="productContainer">
        <div className="productTitle">물품</div>
        <DataGrid
          className="productTable"
          rows={data}
          disableRowSelectionOnClick
          columns={columns}
          getRowId={(row) => row.product_id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </div>
    </div>
  )
}
