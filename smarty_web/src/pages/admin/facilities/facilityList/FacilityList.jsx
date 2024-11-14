import "./facilityList.css"
import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { getListFacility } from "../../../../api/admin/facilityApi"
import { Link } from "react-router-dom"

// const initState = {
//     facility_id: '',
//     facility_name: '',
//     open_time: '',
//     close_time: '',
//     default_time: 0,
//     basic_fee: 0,
//     extra_fee: 0,
//     contact: '',
//     info: '',
//     caution: '',
//     court: false,
//     product: false,
//     facility_status: false,
//     files: [],
// }

export default function FacilityList() {
  const [data, setData] = useState([])

  const handleDelete = (id) => {
    setData(data.filter(item => item.facility_id !== id))
  }

  useEffect(() => {
    getListFacility().then(data => {
      setData(data)
      console.log("시설 목록 : ", data)
    }).catch((error) => console.error('에러 발생 : ', error))
  }, [])

  const columns = [
    { field: 'facility_id', headerName: '시설 ID', width: 180 },
    { field: 'facility_name', headerName: '시설명', width: 160 },
    { field: 'court', headerName: '코트 등록', width: 130 },
    { field: 'product', headerName: '물품 등록', width: 130 },
    { field: 'facility_status', headerName: '시설 개방', width: 130 },
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
    <div className="facilityList">
      <div className="facilityContainer">
        <div className="facilityTitle">시설</div>
        <DataGrid
          className="facilityTable"
          rows={data}
          disableRowSelectionOnClick
          columns={columns}
          getRowId={(row) => row.facility_id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
        <Link to="/facilities/add">
          <button className="facilityAddButton">Create</button>
        </Link>
      </div>
    </div>
  )
}
