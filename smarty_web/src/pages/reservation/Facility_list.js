import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getfacilityId } from '../../api/ReservationAPI';
import MainNav from './../../component/MainNav';
import Wrapper from './../../component/Wrapper';
import Footer from './../../component/Footer';
import '../../css/reservationPage.css'

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
      <MainNav />
      <Wrapper />
      <div className='facility_container'>
        {facility_id.map((i, idx) => (
          <div className='facilityBtn' key={idx}>
            <img src={`http://localhost:8080/api/user/reservation/uploads/${i.file_name[0]}`} />
            <div className='facility_info'>
              <h3>시설명 : {i.facility_name}</h3>
              <h3>코트명 : {i.court_name}</h3>
              <h3>이용시간 : {i.default_time} 시간</h3>
              <h3>기본요금 : {i.basic_fee} 원</h3>
            </div>
            <button className='reservation_btn smail' key={idx} onClick={() => handleClick(i)}>예약하러가기</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Facility_list