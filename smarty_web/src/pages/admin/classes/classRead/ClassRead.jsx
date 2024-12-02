import './classRead.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getListClassDetail, getOneClass, putOneClass } from '../../../../api/admin/classApi'
import { getOneFacility } from '../../../../api/admin/facilityApi'
import { HorizontalRule, WindowSharp } from '@mui/icons-material';

const initClass = {
  key: Date.now(),
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

export default function ClassRead(class_id) {
  const [currentClass, setCurrentClass] = useState(initClass)
  const [classDetail, setClassDetail] = useState([])
  const [weekday, setWeekday] = useState([])
  const [modifyToggle, setModifyToggle] = useState(true)

  useEffect(() => {
    getOneClass(class_id.class_id).then(res => {
      setCurrentClass(res)
      console.log(res)
    }).catch((error) => console.error("ERROR! : ", error))
    getListClassDetail(class_id.class_id).then(res => {
      setClassDetail(res)
    }).catch((error) => console.error("ERROR! : ", error))
  }, [class_id])

  useEffect(() => {
    console.log(currentClass)
  }, [currentClass])

  useEffect(() => {
    classDetail.map(item => setWeekday(prev => [...prev, item.weekday]))
    console.log(weekday)
  }, [classDetail])
  

  const navigate = useNavigate()
  const {facility_id} = useParams()
  const [currentFacility, setCurrentFacility] = useState(null)
  
  const [classList, setClassList] = useState([])  // 강의 정보 객체들의 리스트
  const [weekdayList, setWeekdayList] = useState([]) // 각각의 강의 정보

  
  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
      console.log("facility :", res)
    }).catch((error) => console.error("ERROR!", error))
  }, [])
  

  // 사용자 입력값 classList에 저장
  const handleInput = (e) => {
    currentClass[e.target.name] = e.target.value
    setCurrentClass({...currentClass})
  }

  // 선택 요일 weekdayList에 저장
  const handleClickWeekday = (i, e) => {
    if(e.target.checked) {
      setWeekdayList((prevWeek) => {
        const updateWeek = [...prevWeek]
        updateWeek[i] = [...updateWeek[i], e.target.value]
        return updateWeek
      })
    } else {
      weekdayList[i] = weekdayList[i].filter(day => day != e.target.value) 
    }
  }

  // weekdayList 업데이트시 classList.weekday 업데이트
  useEffect(() => {
    const newClassList = classList.map((item, i) => {
      return {...item, weekday: weekdayList[i]}
    })
    setClassList(newClassList)
  }, [weekdayList])
  
  // 선택 항목 classList, weekdayList에서 삭제
  const handleDelete = (item, i) => {    
    setWeekdayList((prevWeek) => {
      const updateWeek = [...prevWeek]
      const deleteWeek = updateWeek.splice(i, 1)
      console.log("삭제한 week : ", deleteWeek)
      return updateWeek
    })
    setClassList(classList.filter(one => one.key != item.key))
  }

  useEffect(() => {
    console.log("최종 class : ", currentClass)
  }, [currentClass])

  const handleSubmit = () => {
    if(window.confirm("수정하시겠습니까?")) {
      putOneClass(class_id.class_id, currentClass).then(res => {
        console.log(res)
      }).catch((error) => console.error("ERROR!", error))  
    } else navigate({pathname: `/admin/classes/${facility_id}`})
  }
  
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
            {weekday &&
            ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'].map((day, index) => (
              <div key={index}>
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
              // onChange={(e) => console.log(e.target.value)}
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
              // onChange={(e) => console.log(e.target.value)}
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
