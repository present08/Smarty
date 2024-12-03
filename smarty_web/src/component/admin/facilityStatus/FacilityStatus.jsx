import { useEffect, useState } from 'react'
import './facilityStatus.css'
import { useParams } from 'react-router-dom'
import { getListStatus } from '../../../api/admin/statusApi'
import { getListCourt } from '../../../api/admin/courtApi'
import { DataGrid } from '@mui/x-data-grid'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

export default function FacilityStatus() {
    const {facility_id} = useParams()

    const [currentCourt, setCurrentCourt] = useState([])
    const [reservationList, setReservationList] = useState([])
    const [dayReservation, setDayReservation] = useState([])
    const [enrollmentList, setEnrollmentList] = useState([])
    const [currentEnrollment, setCurrentEnrollment] = useState([])

    useEffect(() => {
      const today = new Date()
      today.setHours(24, 0, 0, 0)
      const year = today.getFullYear()
      const month = ("0"+ (today.getMonth() + 1)).slice(-2)
      const day = ("0"+ today.getDate()).slice(-2)
      const time = today.getTime()
      // const formattedDate = `${year}-${month}-${day} ${time}`
    //   const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: false,
    // }).format(today);
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;
        getListCourt(facility_id).then(res => {
          setCurrentCourt(res)
      }).catch((error) => console.error("ERROR!", error))
        getListStatus(facility_id, formattedDate).then(res => {
          setReservationList(res.reservationDTOList)
          setEnrollmentList(res.enrollmentDTOList)
          todayUpdate(res)
        }).catch((error) => console.error("ERROR! : ", error))
      
    }, [facility_id])

    const todayUpdate = (res) => {
      // setDayReservation(res.reservationDTOList.filter(i => JSON.stringify(i.reservation_start).slice(1, 11) == formattedDate))
      setCurrentEnrollment(res.enrollmentDTOList.filter(i => i.status == "개강중"))
    }

    const dateInput = (e) => {
      setDayReservation(reservationList.filter(i => JSON.stringify(i.reservation_start).slice(1, 11) == e.target.value))
      setCurrentEnrollment(enrollmentList.filter(i => i.start_date > e.target.value && e.target.value < i.end_date))
    }
    //  && e.target.value < i.end_date
    const handleReset = () => {
      setDayReservation(reservationList)        
      setCurrentEnrollment(enrollmentList)
    }
    
    const reservationColumns = [
      { field: 'court_name', headerName: '코트명', width: 160 },
      { field: 'user_id', headerName: '회원 ID', width: 130 },
      { field: 'reservation_start', headerName: '시작시간', width: 180 },
      { field: 'reservation_end', headerName: '종료시간', width: 180 },
      { field: 'attendance_status', headerName: '출석', width: 50,
        renderCell: (row) => {
          return (
            (row.row.attendance_status?
              <CheckBox /> : <CheckBoxOutlineBlank />
            )
          )
        }
       }
    ];
    const enrollmentColumns = [
      { field: 'class_name', headerName: '강의명', width: 160 },
      { field: 'start_date', headerName: '시작일', width: 100 },
      { field: 'end_date', headerName: '종료일', width: 100 },
      { field: 'class_size', headerName: '정원', width: 50 },
      { field: 'register', headerName: '등록', width: 50 },
      { field: 'attendance', headerName: '출석', width: 50 },
      { field: 'status', headerName: '상태', width: 100 },
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        // renderCell: (params) => {
        //   return (
        //     <div className="classAction">
        //       <button 
        //         className="classListButton"
        //         onClick={() => handleReadButton(params.row.class_id)}>조회</button>
        //       <button 
        //         className="classListButton" 
        //         onClick={() => handleRemoveButton(params.row.class_id)}>삭제</button>
        //     </div>
        //   )
        // }
      }
    ];
    const paginationModel = { page: 0, pageSize: 10 };


  return (
    <div className='facilityStatus'>
      <div className="reservationSetting">
        <input 
        type='date' 
        // defaultValue={formattedDate}
        onChange={dateInput}/>
        <button onClick={handleReset}>전체보기</button>
      </div>
      <div className="facilityStatusContainer">
        <div className="reservation">
          <div className="facilityStatusTitle">시설 예약 내역</div>
          <DataGrid
            className="classTable"
            rows={dayReservation}
            disableRowSelectionOnClick
            columns={reservationColumns}
            getRowId={(row) => row.user_id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </div>
        <div className="enrollment">
          <div className="facilityStatusTitle">수강 내역</div>
          <DataGrid
              className="classTable"
              rows={currentEnrollment}
              disableRowSelectionOnClick
              columns={enrollmentColumns}
              getRowId={(row) => row.class_name}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
        </div>        
      </div>
    </div>
  )
}