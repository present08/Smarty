import './newClass.css'
import { useParams } from 'react-router-dom'
import { getOneFacility } from '../../../../api/admin/facilityApi'
import { useEffect, useState } from "react"

const initClass = {
  class_name: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  price: 0,
  class_size: 0,
  weekday: []
}
export default function NewClass() {
  const {facility_id} = useParams()
  const [currentFacility, setCurrentFacility] = useState(null)
  
  const [classData, setClassData] = useState(initClass)
  const [classList, setClassList] = useState([])
  const [classNum, setClassNum] = useState(0)
  
  const createForm = (i, key, value) => {
    setClassList((prevList) => {
      const updateList = [...prevList]
      updateList[i] = {...updateList[i], [key]: value}
    })
  }

  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [])

  const handleInput = (e) => {
    classData[e.target.name] = e.target.value
    setClassData({...classData})
    console.log(classData)
  }

  return (
    <div className="newClass">
      <div className="addClassTitle">
        {currentFacility && currentFacility.facility_name} 신규 강의 등록
      </div>
      <button 
        className="addClassFormButton"
        onClick={createForm}
      >
        강의 추가
      </button>

      <div className="addClassContainer">

        <div className="addClassForm">
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">강의명</div>
            <input 
              className='addClassFormItemContent'
              name='class_name'
              type='text'
              value={classData.class_name}
              onChange={handleInput}
              placeholder='ex) 오전 수영강습'
            />
          </div>
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">시작일</div>
            <input 
              name='start_date'
              type='date'
              value={classData.start_date}
              onChange={handleInput}
            />
          </div>
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">종료일</div>
            <input 
              name='end_date'
              type='date'
              value={classData.end_date}
              onChange={handleInput}
            />
          </div>
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">시작시간</div>
            <input 
              name='start_time'
              type='time'
              value={classData.start_time}
              onChange={handleInput}
            />
          </div>
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">종료시간</div>
            <input 
              name='end_time'
              type='time'
              value={classData.end_time}
              onChange={handleInput}
            />
          </div>
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">수강료</div>
            <input 
              name='price'
              type='text'
              value={classData.price}
              onChange={handleInput}
            />
          </div>
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">정원</div>
            <input 
              name='class_size'
              type='text'
              value={classData.class_size}
              onChange={handleInput}
            />
          </div>
          <div className="addClassFormItem">
            <div className="addClassFormItemTitle">수업일(복수선택 가능)</div>
            <input 
              id='mon'
              name='weekday'
              type='checkbox'
              value={classData.class_size}
              onChange={handleInput}
            />
            <label htmlFor='mon'>월요일</label>
            <input 
              id='tue'
              name='weekday'
              type='checkbox'
              value={classData.class_size}
              onChange={handleInput}
            />
            <label htmlFor='tue'>화요일</label>
            <input 
              id='wed'
              name='weekday'
              type='checkbox'
              value={classData.class_size}
              onChange={handleInput}
            />
            <label htmlFor='wed'>수요일</label>
            <input 
              id='thu'
              name='weekday'
              type='checkbox'
              value={classData.class_size}
              onChange={handleInput}
            />
            <label htmlFor='thu'>목요일</label>
            <input 
              id='fri'
              name='weekday'
              type='checkbox'
              value={classData.class_size}
              onChange={handleInput}
            />
            <label htmlFor='fri'>금요일</label>
            <input 
              id='sat'
              name='weekday'
              type='checkbox'
              value={classData.class_size}
              onChange={handleInput}
            />
            <label htmlFor='sat'>토요일</label>
            <input 
              id='sun'
              name='weekday'
              type='checkbox'
              value={classData.class_size}
              onChange={handleInput}
            />
            <label htmlFor='sun'>일요일</label>           
          </div>
        </div>

      </div>
    </div>
  )
}
