import "./facilityRead.css"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_SERVER_HOST, getOneFacility } from "../../../../api/admin/facilityApi"
import { getListCourt } from "../../../../api/admin/courtApi"

export default function FacilityRead() {
  const {facility_id} = useParams()
  const [currentFacility, setCurrentFacility] = useState(null)
  const [currentCourt, setCurrentCourt] = useState(null)
  
  useEffect(() => {
    getOneFacility(facility_id).then(res => {
      setCurrentFacility(res)
    }).catch((error) => console.error("ERROR!", error))
  }, [facility_id])

  useEffect(() => {
    getListCourt(facility_id).then(res => {
      setCurrentCourt(res)
    }).catch((error) => console.error("ERROR! : ", error))
  }, [facility_id])
  
  
  return (
    <div className="facilityRead">
      <div className="facilityReadContainer">
        <div className="facilityContent">
          <div className="facilityImages">이미지 컨테이너<br />
            {currentFacility && currentFacility.file_name.map(file => (
              <img src={`${API_SERVER_HOST}/api/admin/facilities/images/s_${file}`} />
            ))}<br />
            -등록 이미지 슬라이드 확인<br />
            -첨부 파일 수정, 삭제<br />
            -이미지 미리보기<br />
          </div>
          <div className="facilityItem">
            시설정보 컨테이너<br />
            -일반 정보 나열 : 이름, 시간, 연락처, 안내/주의사항<br />
            -가격 관련 : 기본 가격, 할증률, 적용타입<br />
            -되도록이면 조회 화면에서 바로 수정할 수 있게 구성
          </div>
        </div>
        <div className="courtContent">
          코트<br />
          -기본적으로 코트는 1개 이상 조회<br />
          -각 코트별로 수정, 삭제할 수 있도록 함<br />
          -코트 추가 기능
        </div>
      </div>
    </div>
  )
}