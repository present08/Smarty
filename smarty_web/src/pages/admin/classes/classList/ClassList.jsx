import './classList.css'
import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { getListFacility } from "../../../../api/admin/facilityApi"
import { Link, useParams } from "react-router-dom"

export default function ClassList() {
  const {facility_id} = useParams()
  const [data, setData] = useState([])

  const handleDelete = (id) => {
    setData(data.filter(item => item.facility_id !== id))
  }

  // useEffect(() => {
  //   getListFacility().then(data => {
  //     setData(data)
  //   }).catch((error) => console.error('에러 발생 : ', error))
  // }, [])

  const columns = [
    { field: 'class_id', headerName: '강의 ID', width: 180 },
    { field: 'class_name', headerName: '강의명', width: 160 },
    { field: 'start_date', headerName: '개강일', width: 130 },
    { field: 'end_date', headerName: '종강일', width: 130 },
    { field: 'price', headerName: '가격', width: 130 },
    { field: 'class_size', headerName: '정원', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div className="classAction">
            <Link to={`/admin/classes/${facility_id}/read` + params.row.class_id}>
              <button className="classReadButton">Read</button>
            </Link>
          </div>
        )
      }
    }
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <div className="classList">
      <div className="classContainer">
        <div className="classContainerTop">
          <div className="classTitle">강의</div>
          <Link to={`/admin/classes/${facility_id}/add`}>
            <button className="classAddButton">Create</button>
          </Link>
        </div>
        <DataGrid
          className="classTable"
          rows={data}
          disableRowSelectionOnClick
          columns={columns}
          getRowId={(row) => row.class_id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </div>
    </div>
  )
}
