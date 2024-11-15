import { useParams } from "react-router-dom"
import "./facilityRead.css"
import { useEffect, useState } from "react"
import { getOneFacility } from "../../../../api/admin/facilityApi"

export default function FacilityRead() {
  const {facility_id} = useParams()
  const [data, setData] = useState()
  
  useEffect(() => {
    getOneFacility(facility_id).then(data => {
      setData(data)
      console.log(data)
    }).catch((error) => console.error("에러 발생 : ", error))
  }, [])
  
  return (
    <div className="facility">
      <div>{data && data.facility_id}</div>
      <div>{data && data.facility_name}</div>
    </div>
  )
}
