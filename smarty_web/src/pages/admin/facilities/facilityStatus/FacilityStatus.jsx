import './facilityStatus.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getListStatus } from '../../../../api/admin/statusApi'
import { getOneFacility } from '../../../../api/admin/facilityApi';
import { DataGrid } from '@mui/x-data-grid'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import Modal from '../../../../component/admin/modal/Modal'
import ClassStatus from '../../classes/classStatus/ClassStatus'

export default function FacilityStatus() {
    const {facility_id} = useParams()
    const [currentFacility, setCurrentFacility] = useState([])
    const [reservationList, setReservationList] = useState([])
    const [enrollmentList, setEnrollmentList] = useState([])
    const [statusModal, setStatusModal] = useState(false)
    const [class_id, setClass_id] = useState()
    const [class_name, setClass_name] = useState()
    const [selectedDate, setSelectedDate] = useState()

    //===============================오늘 날짜 설정=============================//
    const today = new Date()
    const year = today.getFullYear()
    const month = ("0"+ (today.getMonth() + 1)).slice(-2)
    const day = ("0"+ today.getDate()).slice(-2)
    const formattedDate = `${year}-${month}-${day}`
    //=========================================================================//

    //=================================GET 요청================================//
    useEffect(() => {
      getOneFacility(facility_id).then(res => {
        setCurrentFacility(res)
      }).catch((error) => console.error("ERROR!", error))
        getListStatus(facility_id, formattedDate).then(res => {
          setReservationList(res.reservationDTOList)
          setEnrollmentList(res.enrollmentDTOList)
        }).catch((error) => console.error("ERROR! : ", error))      
    }, [facility_id])

    const dateInput = (e) => {
      setSelectedDate(e.target.value)
      getListStatus(facility_id, e.target.value).then(res => {
        setReservationList(res.reservationDTOList)
        setEnrollmentList(res.enrollmentDTOList)
      }).catch((error) => console.error("ERROR! : ", error)) 
    }
    //=========================================================================//

    //================================출석 조회=================================//
    const handleReadButton = (class_id, class_name) => {
      setStatusModal(true)
      setClass_id(class_id)
      setClass_name(class_name)
      console.log(class_id)
    }
    const closeModal = () => {
      setStatusModal(false)
    }
    //=========================================================================//
    
    //=================================DataGrid================================//
    const reservationColumns = [
      { field: 'court_name', headerName: '코트명', width: 160, headerAlign: 'center' },
      { field: 'user_id', headerName: '회원 ID', width: 130, headerAlign: 'center' },
      { field: 'reservation_start', headerName: '시작시간', width: 180, headerAlign: 'center' },
      { field: 'reservation_end', headerName: '종료시간', width: 180, headerAlign: 'center' },
      { field: 'attendance_status', headerName: '출석', width: 70, headerAlign: 'center',
        renderCell: (row) => {
          return (
            <div className='statusCheckbox'>
              {row.row.attendance_status?
                <CheckBox className='checkbox'/>
                 : <CheckBoxOutlineBlank className='checkbox'/>}
            </div>
          )
        }
       }
    ];

    const enrollmentColumns = [
      { field: 'class_name', headerName: '강의명', width: 220, headerAlign: 'center' },
      { field: 'start_date', headerName: '시작일', width: 130, headerAlign: 'center' },
      { field: 'end_date', headerName: '종료일', width: 130, headerAlign: 'center' },
      { field: 'class_size', headerName: '정원', width: 70, headerAlign: 'center' },
      { field: 'register', headerName: '등록', width: 70, headerAlign: 'center' },
      {
        field: 'action', headerName: 'Action', width: 100, headerAlign: 'center',
        renderCell: (params) => {
          return (
            <div className="statusAction">
              <button 
                className="statusReadButton"
                onClick={() => handleReadButton(params.row.class_id, params.row.class_name)}>조회</button>
            </div>
          )
        }
      }
    ];
    const paginationModel = { page: 0, pageSize: 10 };
    //=========================================================================//

  return (
    <div className='facilityStatus'>
      <div className="facilityStatusSetting">
        <div className="settingTitle">조회할 날짜 선택</div>
        <input 
        type='date' 
        defaultValue={formattedDate}
        onChange={dateInput}/>
      </div>
      <div className="facilityStatusContainer">
        <div className="reservation">
          <div className="facilityStatusTitle">{currentFacility.facility_name} 예약 내역</div>
          <DataGrid
            className="classTable"
            rows={reservationList}
            disableRowSelectionOnClick
            columns={reservationColumns}
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
        <div className="enrollment">
          <div className="facilityStatusTitle">진행중인 강의</div>
          <DataGrid
              className="classTable"
              rows={enrollmentList}
              disableRowSelectionOnClick
              columns={enrollmentColumns}
              getRowId={(row) => row.class_name}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0,
                '& .MuiDataGrid-columnHeaderTitle' : {
                  fontWeight: 'bold',
                  
                },
                '& .MuiDataGrid-cell' : {
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  verticalAlign: 'middle',
                }
               }}
            />
        </div>
        {statusModal? 
          <Modal content={<ClassStatus class_id={class_id} class_name={class_name} today={formattedDate} date={selectedDate} />} callbackFn={closeModal}/>
          : <></>}        
      </div>
    </div>
  )
}