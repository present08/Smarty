import React from 'react';
import FacilityComponent from '../components/FacilityComponent';
import ReservationComponent from '../components/ReservationComponent';
import Information from './../components/Information';
import './ReservationPage.css';

const ReservationPage = () => {
    return (
        <>
            <h1 className='reservation_title'>통합 예약</h1>
            <FacilityComponent /> <button className='reservation_btn'>예약하기</button>
            <Information />
            <ReservationComponent />
        </>
    )
}

export default ReservationPage