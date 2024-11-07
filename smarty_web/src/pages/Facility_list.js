import React from 'react'
import { useEffect, useState } from 'react';
import ReservationPage from './ReservationPage';
import { getCourt } from '../api/ReservationAPI';
import { useNavigate } from 'react-router-dom';

const Facility_list = () => {
  const [court, setCourt] = useState('')
  const navigate = useNavigate();
  const facility_id = ["fc_1730877214863", "fc_1730877214958", "fc_1730877214972", "fc_1730877214980",
    "fc_1730877214985",]

  const handleClick = (i) => {
    navigate(`/${i}`, { state: { facility_id: i, court: "C_000000" } })
  }

  return (
    <div>
      {facility_id.map(i => <button key={i} onClick={() => handleClick(i)}>{i}</button>)}
      {/* { court && facility? 
      <ReservationPage props={facilityData} />:<></>} */}
    </div>
  )
}

export default Facility_list