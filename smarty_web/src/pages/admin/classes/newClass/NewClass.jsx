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
  
  const [classData, setClassData] = useState(initClass) // 각각의 강의 정보
  const [classList, setClassList] = useState([])  // 강의 정보 객체들의 리스트
  
  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [])

  // 사용자 입력값을 classData에 저장
  const handleInput = (e) => {
    classData[e.target.name] = e.target.value
    setClassData({...classData})  
  }
  // 선택한 요일을 classData.weekday에 저장
  const handleClickWeekday = (e) => {
    if(e.target.checked) classData.weekday.push(e.target.value)
    else classData.weekday = classData.weekday.filter(day => day != e.target.value)
    setClassData({...classData})
  }

  // classData -> classList에 추가
  const handleListUp = () => {
    classList.push(classData)
    console.log(classList)
  }
  

  const handleAddClass = () => {
    classList.push(initClass)
    console.log(classList)
  }

  return (
    <div className="newClass">
      <div className="addClassTitle">
        {currentFacility && currentFacility.facility_name} 신규 강의 등록
        <button 
          className="addClassFormButton"
          onClick={handleAddClass}
        >
          강의 추가
        </button>
      </div>

      <div className="addClassContainer">

      {classList && classList.map((item, i) => (
        <div>강의리스트</div>
      ))}

      {/* {classList && classList.map((form, i) => (
          <div className="addClassForm">

          <div className="addClassFormItem1">
            <div className="addClassFormItem1Title">강의명</div>
            <input 
              className='addClassFormItemContent'
              name={`${form}.class_name${i}`}
              type='text'
              value={`form.classData.class_name${i}`}
              onChange={handleInput}
              placeholder='ex) 오전 수영강습'
            />
            <div className="addClassFormItem1Title">시작일</div>
            <input 
              name={`${form}.start_date${i}`}
              type='date'
              value={`${form}.classData.start_date${i}`}
              onChange={handleInput}
            />
            <div className="addClassFormItem1Title">종료일</div>
            <input 
              name={`${form}.end_date${i}`}
              type='date'
              value={`${form}.classData.end_date${i}`}
              onChange={handleInput}
            />
            <div className="addClassFormItemTitle">시작시간</div>
            <input 
              name='start_time'
              type='time'
              value={classData.start_time}
              onChange={handleInput}
            />
            <div className="addClassFormItemTitle">종료시간</div>
            <input 
              name='end_time'
              type='time'
              value={classData.end_time}
              onChange={handleInput}
            />
          </div>

          <div className="addClassFormItem2">
            <div className="addClassFormItem2Title">수강료</div>
            <input 
              name='price'
              type='text'
              value={classData.price}
              onChange={handleInput}
            />
            <div className="addClassFormItemTitle">정원</div>
            <input 
              name='class_size'
              type='text'
              value={classData.class_size}
              onChange={handleInput}
            />
            <div className="addClassFormItem2Weekday">
            <div className="addClassFormItemTitle">수업일(복수선택 가능)</div>
              <input 
                id='mon'
                name='weekday'
                type='checkbox'
                value={'월요일'}
                onChange={(e) => handleClickWeekday(e)}
              />
              <label htmlFor='mon'>월요일</label>
              <input 
                id='tue'
                name='weekday'
                type='checkbox'
                value={'화요일'}
                onChange={(e) => handleClickWeekday(e)}
              />
              <label htmlFor='tue'>화요일</label>
              <input 
                id='wed'
                name='weekday'
                type='checkbox'
                value={'수요일'}
                onChange={(e) => handleClickWeekday(e)}
              />
              <label htmlFor='wed'>수요일</label>
              <input 
                id='thu'
                name='weekday'
                type='checkbox'
                value={'목요일'}
                oonChange={(e) => handleClickWeekday(e)}
              />
              <label htmlFor='thu'>목요일</label>
              <input 
                id='fri'
                name='weekday'
                type='checkbox'
                value={'금요일'}
                onChange={(e) => handleClickWeekday(e)}
              />
              <label htmlFor='fri'>금요일</label>
              <input 
                id='sat'
                name='weekday'
                type='checkbox'
                value={'토요일'}
                onChange={(e) => handleClickWeekday(e)}
              />
              <label htmlFor='sat'>토요일</label>
              <input 
                id='sun'
                name='weekday'
                type='checkbox'
                value={'일요일'}
                onChange={(e) => handleClickWeekday(e)}
              />
              <label htmlFor='sun'>일요일</label>
            </div>
            <button onClick={handleListUp}>리스트업</button>
          </div>
        </div>
      ))} */}
      </div>
    </div>
  )
}
