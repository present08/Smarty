import './classList.css'
import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { getOneFacility } from "../../../../api/admin/facilityApi"
import { Link, useParams } from "react-router-dom"
import { deleteOneClass, getListClass } from '../../../../api/admin/classApi';
import Modal from '../../../../component/admin/modal/Modal';
import ClassRead from '../classRead/ClassRead';
import NewClass from './../newClass/NewClass';
import { Add } from '@mui/icons-material';

export default function ClassList() {
  const {facility_id} = useParams()
  const [currentFacility, setCurrentFacility] = useState(null)  // 조회한 시설 정보
  const [currentClass, setCurrentClass] = useState(null)        // 조회한 강의 정보
  const [classList, setClassList] = useState([])
  const [class_id, setClass_id] = useState(null)
  const [classReadModal, setClassReadModal] = useState(false)
  const [classAddModal, setClassAddModal] = useState(false)
  const [removeToggle, setRemoveToggle] = useState(false)

  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [facility_id])

  useEffect(() => {
    getListClass(facility_id).then(res => {
      setCurrentClass(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [facility_id, removeToggle, classList])

  const handleReadButton = (class_id) => {
    setClassReadModal(true)
    setClass_id(class_id)
    console.log(class_id)
  }
  const handleRemoveButton = (class_id) => {
    if(window.confirm("해당 강의를 삭제하시겠습니까?")) {
      deleteOneClass(class_id).then(setRemoveToggle(!removeToggle)).catch((error) => console.error("ERROR!", error))
    }
  }

  const handleAddbutton = () => {
    setClassAddModal(true)
  }
  const closeModal = () => {
    if(classReadModal) setClassReadModal(false)
    else setClassAddModal(false)
  }
  
  const classPass = (result) => {
    setClassList(result)
    setClassAddModal(false)
  }
  
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
            <button 
              className="classListButton"
              onClick={() => handleReadButton(params.row.class_id)}>조회</button>
            <button 
              className="classListButton" 
              onClick={() => handleRemoveButton(params.row.class_id)}>삭제</button>
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
          <div className="classTitle">{currentFacility && currentFacility.facility_name} 강의 목록</div>
            <Add className="classAddButton" onClick={handleAddbutton} />
          </div>
          <DataGrid
            className="classTable"
            rows={currentClass}
            disableRowSelectionOnClick
            columns={columns}
            getRowId={(row) => row.class_id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
          {classReadModal? 
          <Modal content={<ClassRead class_id={class_id} />} callbackFn={closeModal}/>
          : <></>}
          {classAddModal?
          <Modal content={<NewClass classPass={classPass} passedClass={currentClass} passedFacility={currentFacility} />} callbackFn={closeModal}/>
          : <></>}
      </div>
    </div>
  )
}
