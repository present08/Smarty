import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MainNav from '../MainNav';
import Footer from '../Footer';
import Wrapper from '../Wrapper';

const Facility_list = () => {
  const [court, setCourt] = useState('');
  const navigate = useNavigate();
  const facility_id = [
    "fc_1730949353199",
    "fc_1730949353249",
    "fc_1730949353252",
    "fc_1730949353254",
    "fc_1730949353256"
  ];

  const handleClick = (i) => {
    navigate(`/facilityList/${i}`, { state: { facility_id: i, court: "C_000000" } })
    console.log(i)
  }
  return (
    <div>
      <MainNav />
      <Wrapper />
      {facility_id.map(i => (
        <button key={i} onClick={() => handleClick(i)}>
          {i}
        </button>
      ))}
      {/* { court && facility ? 
      <ReservationPage props={facilityData} />:<></>} */}
      <Footer />
    </div>
  );
};

export default Facility_list;
