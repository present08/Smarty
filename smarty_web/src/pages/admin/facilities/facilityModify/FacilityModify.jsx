import { Link, useParams } from "react-router-dom"
import "./facilityModify.css"
import { useEffect, useState } from "react"
import { getOneFacility } from "../../../../api/admin/facilityApi"

export default function FacilityModify() {
  const {facility_id} = useParams()
  const [currentFacility, setCurrentFacility] = useState(null)
  const [modifiedFacility, setModifiedFacility] = useState(null)
  
  // 기존 시설 정보, 초기값 복원을 위해 기존값, 변경값 두 가지 상태 관리
  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
      setModifiedFacility(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [facility_id])

  // 수정 내용 반영
  const handleInputModify = (e) => {
    modifiedFacility[e.target.name] = e.target.value
    setModifiedFacility({...modifiedFacility})
  }
  const handleSubmit = () => {
    console.log("등록")
  }
  // 가격 변동률 radio value 업데이트 함수
  const handlePrice = (e) => {
    modifiedFacility.hot_time = Number(e.target.value)
    setModifiedFacility({ ...modifiedFacility })
    console.log("수정! : ", modifiedFacility.hot_time)
  }
  const handlePriceCancle = (e) => {
      modifiedFacility.rate_adjustment = 0
      modifiedFacility.hot_time = 0
      setModifiedFacility({ ...modifiedFacility })
      console.log("수정! : ", modifiedFacility)
  }

// 초기값 복원
const handleReset = () => {
  setModifiedFacility((prev) => {
    let resetFacility = {...prev}
    resetFacility = currentFacility
    return resetFacility
  })
}
useEffect(() => {
  console.log("수정! : ", modifiedFacility)  
  
}, [handleReset])

  
  return (
    <div className="facilityRead">
        {modifiedFacility && 
          <div className="facilityReadContainer">        
            <div className="facilityReadTitle">{modifiedFacility.facility_id}</div>
            <button className="facilityModifyButton" onClick={handleSubmit}>등록</button>
            <button className="facilityResetButton" onClick={handleReset}>초기값 복원</button>
            <div className="facilityContent">

              <div className="facilityContentItem1">
                <div className="facilityContentItemTitle">시설명</div>
                <input 
                  type="text"
                  name="facility_name"
                  value={modifiedFacility.facility_name} 
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">개장시간</div>
                <input 
                  type="time"
                  name="open_time"
                  value={modifiedFacility.open_time} 
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">폐장시간</div>
                <input 
                  type="time"
                  name="close_time"
                  value={modifiedFacility.close_time} 
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">기본이용시간</div>
                <input 
                  type="number"
                  name="default_time"
                  value={modifiedFacility.default_time} 
                  onChange={handleInputModify}
                />
              </div>

              <div className="facilityContentItem2">
                <div className="facilityContentItemTitle">기본이용요금</div>
                <input 
                  type="text"
                  name="basic_fee"
                  value={modifiedFacility.basic_fee} 
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">가격변동률 {modifiedFacility.rate_adjustment}</div>
                <input 
                  type="range"
                  name="rate_adjustment"
                  min={0}
                  max={1}
                  step={0.05}
                  value={modifiedFacility.rate_adjustment}
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">변동가격적용</div>
                <h3>체크박스</h3>
                <div>
                    <input
                        name="hot_time"
                        id="discount"
                        type={"radio"}
                        value={1}
                        onClick={(e) => handlePrice(e)}
                    />
                    <label htmlFor="discount"> 조조할인 (첫 타임)</label>
                </div>
                <div>
                    <input
                        name="hot_time"
                        id="surcharge"
                        type={"radio"}
                        value={2}
                        onClick={(e) => handlePrice(e)}
                    />
                    <label htmlFor="surcharge"> 야간할증 (마지막 타임)</label>
                </div>
                <div>
                    <input
                        name="hot_time"
                        id="all"
                        type={"radio"}
                        value={3}
                        onClick={(e) => handlePrice(e)}
                    />
                    <label htmlFor="all"> 모두 (할인, 할증 적용)</label>
                </div>
              </div> 

              <div className="facilityContentItem3">
                <div className="facilityContentItemTitle">연락처</div>
                <input 
                  type="text"
                  name="contact"
                  value={modifiedFacility.contact} 
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">이용안내</div>
                <textarea 
                  type="text"
                  name="info"
                  value={modifiedFacility.info} 
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">주의사항</div>
                <textarea 
                  type="text"
                  name="caution"
                  value={modifiedFacility.caution} 
                  onChange={handleInputModify}
                />
                <div className="facilityContentItemTitle">시설 사진</div>
                {modifiedFacility.file_name.map((file) => (
                  <img src={`http://localhost:8080/api/admin/facilities/images/s_${file}`}/>
                ))}
              </div>

            </div>
          </div>
        }      
    </div>
  )
}