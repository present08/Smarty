import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getfacilityId } from '../../api/ReservationAPI';

const Facility_list = () => {
  const navigate = useNavigate();
  const [facility_id, setFacility_id] = useState([])

  useEffect(() => {
    getfacilityId().then(e => {
      e.map(i => {
        if (facility_id.length < e.length) {
          setFacility_id(prev => [...prev, i]);
        }
        console.log(i)
      });
    })
  }, [])


  const handleClick = (i) => {
    navigate(`/facilityList/${i.facility_id}`, { state: i })
    console.log("iiiiiii", i.facility_id)
  }

  return (
    <div>
      {facility_id.map((i, idx) => <button key={idx} onClick={() => handleClick(i)}>{i.facility_name}, {i.court_name}</button>)}
    </div>
  )
}

export default Facility_list