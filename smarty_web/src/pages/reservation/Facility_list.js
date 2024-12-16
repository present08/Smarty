import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getfacilityId } from '../../api/reservaionApi';
import MainNav from './../../component/MainNav';
import Wrapper from './../../component/Wrapper';
import Footer from './../../component/Footer';
import '../../css/reservationPage.css'
import BackToTopButton from '../../component/BackToTopButton';
import axiosInstance from '../../api/axiosInstance';

const Facility_list = () => {

  const [facility_id, setFacility_id] = useState([])
  
  useEffect(() => {
    getfacilityId().then(e => {
      e.map(i => {
        if (facility_id.length < e.length) {
          setFacility_id(prev => [...prev, i]);
        }
      });
    })
  }, [])

  
  const navigate = useNavigate();
  const handleClick = (i) => {
    navigate(`/facilityList/${i.facility_id}`, { state: i })
  }

  return (
    <div>
      <MainNav />
      <Wrapper />
      <BackToTopButton />
      <div className='facility_container'>
        <div>
          {facility_id.map((i, idx) => (
            <div className='facilityBtn' key={idx} onClick={() => handleClick(i)}>              
              <img src={`http://localhost:8080/api/user/reservation/uploads/${i.file_name[0]}`} />
              <div className='facility_info'>
                <h3>{i.facility_name}</h3>
                <p>{i.court_name} ({i.default_time}시간)</p>
                <div>
                  <div>
                    <p style={{ fontSize: '21px', color: '#5700f8' }}>{i.basic_fee}</p>
                    <p style={{ color: 'gray', textIndent: '0px', fontSize: '20px', }}>원</p>
                  </div>
                  <p style={{ fontSize: '17px', color: 'gray', marginLeft: '120px' }}>오픈시간:{i.open_time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default Facility_list