import React from 'react'
import { useEffect, useState } from 'react';
import ReservationPage from './ReservationPage';
import { getCourt } from '../api/ReservationAPI';
import { useNavigate } from 'react-router-dom';

const Facility_list = () => {
  const [court, setCourt] = useState('')
  const navigate = useNavigate();
  const facility_id = ['fc_1730518212730',
    'fc_1730518212771',
    'fc_1730518212777',
    'fc_1730518212782',
    'fc_1730518212787',]

  const handleClick = (i) =>{
    navigate(`/${i}`,{state : {facility_id: i , court:"C_1234"}})
  }
//   useEffect(() => {
//     getCourt(facility, court)
//         .then((e)=> setFacilityData(e))
//   }, [court])
  const court_id = 'C_1234'
  
  return (
    <div>
        {facility_id.map(i => <button key={i} onClick={() => handleClick(i)}>{i}</button>)}
      {/* { court && facility? 
      <ReservationPage props={facilityData} />:<></>} */}
    </div>
)}

export default Facility_list