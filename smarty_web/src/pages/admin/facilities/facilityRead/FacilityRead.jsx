import { useParams } from "react-router-dom"
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
            <div className="facilityReadTitle">{currentFacility.facility_name}</div>
            <div className="facilityContent">
              
                <div className="facilityContentLeft">
                  <div className="facilityContentLeftItem">
                    <div className="facilityContentLeftItemTitle">시설ID</div>
                    <input value={currentFacility.facility_id} readOnly/>
                  </div>
                  <div className="facilityContentLeftItem">
                    <div className="facilityContentLeftItemTitle">개장시간</div>
                    <input value={currentFacility.open_time} readOnly/>
                  </div>
                  <div className="facilityContentLeftItem">
                    <div className="facilityContentLeftItemTitle">폐장시간</div>
                    <input value={currentFacility.close_time} readOnly/>
                  </div>
                  <div className="facilityContentLeftItem">
                    <div className="facilityContentLeftItemTitle">기본이용시간</div>
                    <input value={currentFacility.default_time} readOnly/>
                  </div>
                  <div className="facilityContentLeftItem">
                    <div className="facilityContentLeftItemTitle">기본이용요금</div>
                    <input value={currentFacility.basic_fee} readOnly/>
                  </div>
                  <div className="facilityContentLeftItem">
                    <div className="facilityContentLeftItemTitle">가격변동률</div>
                    <input value={currentFacility.rate_adjustment} readOnly/>
                  </div>
                  <div className="facilityContentLeftItem">
                    <div className="facilityContentLeftItemTitle">변동가격적용</div>
                    <input value={currentFacility.hot_time} readOnly/>
                  </div>                  
                </div>

                <div className="facilityContentRight">
                  <div className="facilityContentRightItem">
                    <div className="facilityContentRightItemTitle">연락처</div>
                    <input value={currentFacility.contact} readOnly/>
                  </div>               
                  <div className="facilityContentRightItem">
                    <div className="facilityContentRightItemTitle">이용안내</div>
                    <input value={currentFacility.info} readOnly/>
                  </div>               
                  <div className="facilityContentRightItem">
                    <div className="facilityContentRightItemTitle">주의사항</div>
                    <input value={currentFacility.caution} readOnly/>
                  </div>               
                  <div className="facilityContentRightItem">
                    <div className="facilityContentRightItemTitle">시설 사진</div>
                    <img src={`http://localhost:8080/api/admin/facilities/images/s_${currentFacility.file_name}`}/>
                  </div>               
                </div>
                
            </div>
          </div>
        }      
    </div>
  )
}
