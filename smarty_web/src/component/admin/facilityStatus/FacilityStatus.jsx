import { useEffect, useState } from 'react'
import './facilityStatus.css'
import { useParams } from 'react-router-dom'
import { getListStatus } from '../../../api/admin/statusApi'

export default function FacilityStatus() {
    const {facility_id} = useParams()
    const [currentStatus, setCurrentStatus] = useState([])
    const [allReservation, setAllReservation] = useState([])
    const [allEnrollment, setAllEnrollment] = useState([])
    const [resAttendance, setResAttendance] = useState([])
    const [enrAttendance, setEnrAttendance] = useState([])

    useEffect(() => {
      getListStatus(facility_id).then(res => {
        [res.allEnrollment].map(v => console.log(Object.values(v)))
        // setCurrentStatus(res)
        // setAllReservation([res.allEnrollment])
        // setAllEnrollment([res.allEnrollment])
        // setResAttendance([res.resAttendance])
        // setEnrAttendance([res.enrAttendance])
      }).catch((error) => console.error("ERROR! : ", error))
    }, [facility_id])

    // const getEntires = Object.entries(currentStatus).map((v) => console.log(v[0]))

  return (
    <div className='facilityStatus'>
      <div className="facilityStatusContainer">
        <div className="reservation">
          {/* {currentStatus.map((statusValue) => (
            <div>{statusValue.allReservation}</div>
          ))} */}
        </div>
        <div className="enrollment">
          수강신청
        </div>
      </div>
    </div>
  )
}
