import './newClass.css'
import { useEffect, useState } from "react"
import { postAddClass } from '../../../../api/admin/classApi'
import { Add, Remove } from '@mui/icons-material';

export default function NewClass({ classPass, passedClass, passedFacility }) {
  const [currentFacility, setCurrentFacility] = useState(null)
  const [addClassToggle, setAddClassTogle] = useState(false) // 강의 추가등록 여부 확인값
  const [maxClassIdx, setMaxClassIdx] = useState()
  const [classList, setClassList] = useState([])        // ClassVO 리스트
  const [weekdayList, setWeekdayList] = useState([])    // 각 ClassVO의 classDetailVO

  //================================추가 등록 설정==================================//
  useEffect(() => {
    // 추가 등록 시 사용할 최종 등록 class_id 추출
    setCurrentFacility(passedFacility)
    if (passedClass.length > 0) {
      setAddClassTogle(true)
      setMaxClassIdx(Number(passedClass[passedClass.length - 1].class_id.slice(6)))
    }
  }, [])
  //===============================================================================//

  //===================================강의 추가====================================//
  const handleAddClass = () => {
    // 강의 등록폼 추가
    const initClass = {
      key: Date.now(),
      facility_id: currentFacility.facility_id,
      class_id: null,
      class_name: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      price: 0,
      class_size: 0,
      weekday: []
    }
    setClassList(prevClass => [...prevClass, initClass])
    setWeekdayList(prevWeek => [...prevWeek, []])
  }

  const handleInput = (i, key, value) => {
    // 사용자 입력값 classList에 저장
    setClassList((prevList) => {
      const updateList = [...prevList]
      updateList[i] = {...updateList[i], [key]: value}
      return updateList
    }) 
    // 신규 강의가 아닌 경우 class_id 생성하여 부여
    if(addClassToggle) {
      let idx = "";
      if ((maxClassIdx + i + 1) - 10 < 0) idx = "0" + (maxClassIdx + i + 1);
      else idx = (maxClassIdx + i + 1) + "";
      let classID = "C_" + currentFacility.facility_id.slice(12) + idx
      setClassList((prevList) => {
        const updateList = [...prevList]
        updateList[i] = { ...updateList[i], class_id: classID }
        return updateList
      })
    }
  }

  const handleClickWeekday = (i, e) => {
    // 선택 요일 weekdayList에 저장
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

  useEffect(() => {
    // weekdayList 업데이트시 classList.weekday 업데이트
    const newClassList = classList.map((item, i) => {
      return { ...item, weekday: weekdayList[i] }
    })
    setClassList(newClassList)
  }, [weekdayList])

  //===============================================================================//
  
  //===============================항목 삭제 & 등록 취소============================//
  const handleDelete = (item, i) => {    
    setWeekdayList((prevWeek) => {
      const updateWeek = [...prevWeek]
      const deleteWeek = updateWeek.splice(i, 1)
      console.log("삭제한 week : ", deleteWeek)
      return updateWeek
    })
    setClassList(classList.filter(one => one.key != item.key))
  }
  
  const handleCancel = () => {
    classPass.classPass(classList)
  }
  //===============================================================================//

  //==================================POST 요청====================================//
  const handleSubmit = () => {
    postAddClass(classList).then(res => {
      alert("신규 강의가 등록되었습니다.")
      classPass(classList)
    }).catch((error) => console.error("ERROR!", error))
  }
  //===============================================================================//

  return (
    <div className="newClass">
      <div className="newClassContainer">
        <div className="addClassFormHead">
          <div className="addClassTitle">
            {currentFacility && currentFacility.facility_name} 신규 강의 등록
          </div>
          <Add className='addClassButton' onClick={handleAddClass} />
        </div>

        <div className="addClassFormBody">
          {classList.map((item, i) => (
            <div className="addClassForm" key={item.key}>
              <div className="addClassFormItem1">
                <div className="addClassFormItem2Title">강의명</div>
                <input
                  type='text'
                  name={`class_name${i}`}
                  placeholder={`ex) 강의명 ${i + 1}`}
                  onChange={(e) => handleInput(i, 'class_name', e.target.value)}
                />
                <div className="addClassFormItem2Title">수강료</div>
                <input
                  type='text'
                  name={`price${i}`}
                  placeholder={`ex) 10000`}
                  // value={`0`}
                  onChange={(e) => handleInput(i, 'price', e.target.value)}
                />
                <div className="addClassFormItemTitle">정원</div>
                <input
                  type='text'
                  name={`class_size${i}`}
                  placeholder={`ex) 50`}
                  onChange={(e) => handleInput(i, 'class_size', e.target.value)}
                />
              </div>

              <div className="addClassFormItem2">
                <div className="addClassFormItem1Title">시작일</div>
                <input
                  type='date'
                  name={`start_date${i}`}
                  min={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => handleInput(i, 'start_date', e.target.value)}
                />
                <div className="addClassFormItem1Title">종료일</div>
                <input
                  type='date'
                  name={`end_date${i}`}
                  min={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => handleInput(i, 'end_date', e.target.value)}
                />
              </div>
              <div className="addClassFormItem3">
                <div className="addClassFormItemTitle">시작시간</div>
                <input
                  type='time'
                  name={`start_time${i}`}
                  onChange={(e) => handleInput(i, 'start_time', e.target.value)}
                />
                <div className="addClassFormItemTitle">종료시간</div>
                <input
                  type='time'
                  name={`end_time${i}`}
                  // max={currentFacility.close_time}
                  onChange={(e) => handleInput(i, 'end_time', e.target.value)}
                />
              </div>
              <div className="addClassFormItem4">
                <div className="addClassFormItemTitle">수업일</div>
                <input
                  id={`mon${i}`}
                  name={`weekday${i}`}
                  type='checkbox'
                  value={'월요일'}
                  onChange={(e) => handleClickWeekday(i, e)}
                />
                <label htmlFor={`mon${i}`}>월요일</label>
                <input
                  id={`tue${i}`}
                  name={`weekday${i}`}
                  type='checkbox'
                  value={'화요일'}
                  onChange={(e) => handleClickWeekday(i, e)}
                />
                <label htmlFor={`tue${i}`}>화요일</label>
                <input
                  id={`wed${i}`}
                  name={`weekday${i}`}
                  type='checkbox'
                  value={'수요일'}
                  onChange={(e) => handleClickWeekday(i, e)}
                />
                <label htmlFor={`wed${i}`}>수요일</label>
                <input
                  id={`thu${i}`}
                  name={`weekday${i}`}
                  type='checkbox'
                  value={'목요일'}
                  onChange={(e) => handleClickWeekday(i, e)}
                />
                <label htmlFor={`thu${i}`}>목요일</label>
                <input
                  id={`fri${i}`}
                  name={`weekday${i}`}
                  type='checkbox'
                  value={'금요일'}
                  onChange={(e) => handleClickWeekday(i, e)}
                />
                <label htmlFor={`fri${i}`}>금요일</label>
                <input
                  id={`sat${i}`}
                  name={`weekday${i}`}
                  type='checkbox'
                  value={'토요일'}
                  onChange={(e) => handleClickWeekday(i, e)}
                />
                <label htmlFor={`sat${i}`}>토요일</label>
                <input
                  id={`sun${i}`}
                  name={`weekday${i}`}
                  type='checkbox'
                  value={'일요일'}
                  onChange={(e) => handleClickWeekday(i, e)}
                />
                <label htmlFor={`sun${i}`}>일요일</label>
                <Remove className='cancleClassButton' onClick={() => handleDelete(item, i)} />
              </div>
            </div>
          ))}
        </div>
        {classList.length > 0 ?
          <div className="facilityButtons">
            <button className='submitClassButton' onClick={handleSubmit}>등록</button>
            <button className="cancelClassButton" onClick={handleCancel}>취소</button>
          </div>
          : <></>}
      </div>
    </div>
  )
}
