import { useEffect, useState } from 'react'
import './facilityStatus.css'
import { useParams } from 'react-router-dom'
import { getListStatus } from '../../../api/admin/statusApi'

export default function FacilityStatus() {
    const {facility_id} = useParams()
    const [currentStatus, setCurrentStatus] = useState([])

    useEffect(() => {
      getListStatus(facility_id).then(res => setCurrentStatus(res)).catch((error) => console.error("ERROR! : ", error))
    }, [facility_id])
    console.log(currentStatus)
  return (
    <div>FacilityStatus</div>
  )
}
