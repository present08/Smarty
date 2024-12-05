import './classStatus.css'
import { useEffect, useState } from 'react'
import { getListAttendance } from '../../../../api/admin/statusApi'
import { DataGrid } from '@mui/x-data-grid'

export default function ClassStatus({ class_id, class_name, today, date }) {
    const [selectedDate, setSelectedDate] = useState()
    const [currentAttendance, setCurrentAttendance] = useState([])

    //================================조회일 설정==================================// 
    useEffect(() => {
        if(date) {
            getData(date)
            setSelectedDate(date)
        } else {
            getData(today)
            setSelectedDate(today)     
        }
    }, [class_id])
    //============================================================================//

    //==================================GET 요청==================================//
    const getData = (condition) => {
        getListAttendance(class_id, condition).then(res => {
            setCurrentAttendance(res)
            console.log(res)
        }).catch((error) => console.error("ERROR!", error))    
    }
    //============================================================================//
    
    //================================DataGrid===================================//
    const enrollmentColumns = [
      { field: 'user_id', headerName: '사용자 ID', width: 130, headerAlign: 'center' },
      { field: 'checkin_date', headerName: '출석시간', width: 180, headerAlign: 'center' },
      { field: 'attendance_status', headerName: '출석', width: 100, headerAlign: 'center',
        renderCell: (params) => {
          return (
            <div>
              {params.row.attendance_status == 'Present'? '출석' : '지각'}
            </div>
          )
        }
       },
    ];
    const paginationModel = { page: 0, pageSize: 5 };
    //===========================================================================//

  return (
    <div className="classStatus">
          <div className="classStatusTitle">{class_name} : {selectedDate}</div>
          <div className="attendanceTable">
            <DataGrid
                rows={currentAttendance}
                disableRowSelectionOnClick
                columns={enrollmentColumns}
                getRowId={(row) => row.user_id}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0,
                  '& .MuiDataGrid-columnHeaderTitle' : {
                    fontWeight: 'bold',
                    
                  },
                  '& .MuiDataGrid-cell' : {
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                 }}
                />
          </div>
    </div>
  )
}
