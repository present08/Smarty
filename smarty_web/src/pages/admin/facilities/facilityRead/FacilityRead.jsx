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
    <div className="facility">
      <div>{currentFacility && currentFacility.facility_id}</div>
      <div>{currentFacility && currentFacility.facility_name}</div>
    </div>
  )
}
