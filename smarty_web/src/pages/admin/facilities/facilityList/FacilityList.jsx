import "./facilityList.css"
import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { getListFacility } from "../../../../api/admin/facilityApi"
import { Link } from "react-router-dom"

export default function FacilityList() {
  const [facilityList, setFailityList] = useState([])

  //=================================GET 요청=================================//
  useEffect(() => {
    getListFacility().then(res => {
      setFailityList(res)
    }).catch((error) => console.error('에러 발생 : ', error))
  }, [])
  //==========================================================================//
  
  //=================================DataGrid=================================//

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
          <div className="facilityAction">
            <Link to={"/admin/facilities/read/" + params.row.facility_id}>
              <button className="facilityReadButton">조회</button>
            </Link>
          </div>
        )
      }
    }
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  //==========================================================================//

  return (
    <div className="facilityList">
      <div className="facilityContainer">
        <div className="facilityContainerTop">
          <div className="facilityTitle">전체 시설 목록</div>
          <Link to="/admin/facilities/add">            
            <button className="facilityAddButton">시설추가</button>
          </Link>
        </div>
        <DataGrid
          className="facilityTable"
          rows={facilityList}
          disableRowSelectionOnClick
          columns={columns}
          getRowId={(row) => row.facility_id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </div>
    </div>
  )
}
