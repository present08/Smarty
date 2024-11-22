import { Link, useParams } from "react-router-dom"
import "./facilityRead.css"
import { useEffect, useState } from "react"
import { getOneFacility } from "../../../../api/admin/facilityApi"

export default function FacilityRead() {
  const {facility_id} = useParams()
  const [currentFacility, setCurrentFacility] = useState(null)
  
  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [facility_id])
  
  return (
    <div className="facilityRead">
        {currentFacility && 
          <div className="facilityReadContainer">        
            <div className="facilityReadTitle">{currentFacility.facility_id}</div>
            <Link to={`/admin/facilities/modify/${facility_id}`}>
              <button className="facilityModifyButton">수정</button>
            </Link>
            <div className="facilityContent">

              <div className="facilityContentItem1">
                <div className="facilityContentItemTitle">시설명</div>
                <input value={currentFacility.facility_name} readOnly/>
                <div className="facilityContentItemTitle">개장시간</div>
                <input value={currentFacility.open_time} readOnly/>
                <div className="facilityContentItemTitle">폐장시간</div>
                <input value={currentFacility.close_time} readOnly/>
                <div className="facilityContentItemTitle">기본이용시간</div>
                <input value={currentFacility.default_time} readOnly/>
              </div>

              <div className="facilityContentItem2">
                <div className="facilityContentItemTitle">기본이용요금</div>
                <input value={currentFacility.basic_fee} readOnly/>
                <div className="facilityContentItemTitle">가격변동률</div>
                <input value={currentFacility.rate_adjustment} readOnly/>
                <div className="facilityContentItemTitle">변동가격적용</div>
                <input value={currentFacility.hot_time} readOnly/>
              </div> 

              <div className="facilityContentItem3">
                <div className="facilityContentItemTitle">연락처</div>
                <input value={currentFacility.contact} readOnly/>
                <div className="facilityContentItemTitle">이용안내</div>
                <textarea value={currentFacility.info} readOnly/>
                <div className="facilityContentItemTitle">주의사항</div>
                <textarea value={currentFacility.caution} readOnly/>
                <div className="facilityContentItemTitle">시설 사진</div>
                {currentFacility.file_name.map((file) => (
                  <img src={`http://localhost:8080/api/admin/facilities/images/s_${file}`}/>
                ))}
              </div>

            </div>
          </div>
        }      
    </div>
  )
}