import './classRead.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getListClassDetail, getOneClass, putOneClass } from '../../../../api/admin/classApi'
import { HorizontalRule } from '@mui/icons-material';

const initClass = {
  facility_id: '',
  class_name: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  price: 0,
  class_size: 0,
  weekday: []
}

export default function ClassRead({ class_id, modifyPass }) {
  const navigate = useNavigate()
  const {facility_id} = useParams()
  const [currentClass, setCurrentClass] = useState(initClass)
  const [classDetail, setClassDetail] = useState([])
  const [weekday, setWeekday] = useState([])
  const [modifyToggle, setModifyToggle] = useState(true)
  const weekSet = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']

  //===================================GET 요청=======================================//
  useEffect(() => {
    getOneClass(class_id).then(res => {
      setCurrentClass(res)
    }).catch((error) => console.error("ERROR! : ", error))
    getListClassDetail(class_id).then(res => {
      setClassDetail(res)
    }).catch((error) => console.error("ERROR! : ", error))
  }, [class_id])

  useEffect(() => {
    classDetail.map(item => setWeekday(prev => [...prev, item.weekday]))
  }, [classDetail])
   //================================================================================//
  

  //===============================수정내용 반영======================================//
  const handleInput = (e) => {
    currentClass[e.target.name] = e.target.value
    setCurrentClass({...currentClass})
  }

  const handleClickWeekday = (e) => {
    // 선택 요일 weekday에 저장
    if(e.target.checked) setWeekday((prev) => [...prev, e.target.value])
    else setWeekday(weekday.filter(day => day != e.target.value)) 
  }

  useEffect(() => {
    // weekday 업데이트시 currentClass.weekday 업데이트
    currentClass.weekday = weekday
    setCurrentClass({...currentClass})
  }, [weekday])
  //================================================================================//

  //===================================PUT 요청=====================================//
  const handleSubmit = () => {
    if(window.confirm("수정하시겠습니까?")) {
      putOneClass(class_id, currentClass)
      .then(modifyPass(currentClass))
      .catch((error) => console.error("ERROR!", error))  
    } else navigate({pathname: `/admin/classes/${facility_id}`})
  }
  //================================================================================//
  
  return (
    <div className="classRead">
        <div className="classReadContainer">
          <div className="classReadItem">
            <div className="classReadItemTitle">강의명</div>
            <input 
              type='text'
              name={`class_name`}
              placeholder={`ex) 강의명`}
              defaultValue={currentClass.class_name || ''}
              onChange={(e) => handleInput(e)}
              disabled={modifyToggle}
            />
          </div>
          <div className="classReadItem">
            <div className="classReadItemTitle">가격</div>
            <input 
              type='text'
              name={`price`}
              placeholder={`ex) 10000`}
              defaultValue={currentClass.price || ''}
              onChange={(e) => handleInput(e)}
              disabled={modifyToggle}
            />
          </div>
          <div className="classReadItem">
            <div className="classReadItemTitle">정원</div>
            <input 
              type='text'
              name={`class_size`}
              placeholder={`ex) 50`}
              defaultValue={currentClass.class_size || ''}
              onChange={(e) => handleInput(e)}
              disabled={modifyToggle}
            />
          </div>
          <div className="classReadItem">
            <div className="classReadItemTitle">수강기간</div>
            <input 
              type='date'
              name={`start_date`}
              onChange={(e) => handleInput(e)}
              defaultValue={currentClass.start_date || ''}
              disabled={modifyToggle}
            />
            <div className="dashIcon">
              <HorizontalRule />
            </div>
            <input 
              type='date'
              name={`end_date`}
              onChange={(e) => handleInput(e)}
              defaultValue={currentClass.end_date || ''}
              disabled={modifyToggle}
            />
          </div>
          <div className="classReadItem">
            <div className="classReadItemTitle">수강일</div>
            {weekday && weekSet.map((day, i) => (
              <div key={i}>
                <input
                  id={day}
                  name="weekday"
                  type="checkbox"
                  value={day}
                  onChange={(e) => handleClickWeekday(e)}
                  checked={weekday.includes(day)} // weekday 배열에 해당 day가 포함되어 있으면 체크
                  disabled={modifyToggle}
                />
                <label className='checkboxLabel' htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
          <div className="classReadItem">
            <div className="classReadItemTitle">수강시간</div>
            <input 
              type='time'
              name={`start_time`}
              onChange={(e) => handleInput(e)}
              defaultValue={currentClass.start_time || ''}
              disabled={modifyToggle}
            />
            <div className="dashIcon">
              <HorizontalRule />
            </div>
            <input 
              type='time'
              name={`end_time`}
              onChange={(e) => handleInput(e)}
              defaultValue={currentClass.end_time || ''}
              disabled={modifyToggle}
            />
          </div>
        </div>        
        <div className="classReadButton">
          {modifyToggle?
          <button className='classModifyButton' onClick={() => setModifyToggle(!modifyToggle)}>수정</button>
          : <button className='classModifyButton' onClick={handleSubmit}>등록</button>}
        </div> 
    </div>
  )
}
