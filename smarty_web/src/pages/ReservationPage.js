import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import FacilityComponent from '../components/FacilityComponent';
import ReservationComponent from '../components/ReservationComponent';
import Information from './../components/Information';
import './ReservationPage.css';
import { getCourt, getReservation } from '../api/ReservationAPI';
import { useLocation } from 'react-router-dom';

const ReservationPage = () => {
    const [facilityData, setFacilityData] = useState({})
    const [reserved, setReserved] = useState([])
    const [reservationFlag, setReservationFlag] = useState(false)
    const location = useLocation();
    const focusRef = useRef(null);
    useEffect(() => {
        getCourt(location.state.facility_id, location.state.court)
            .then((e)=> setFacilityData(e))
    }, [])
    
    const reservationClick = (facility_id) =>{
        getReservation(facility_id).then(e => {
            // console.log(e)
            setReserved([...reserved, {start_date:e.reservation_start.substring(0,10),end_date:e.reservation_end.substring(0,10), start_time:Number(e.reservation_start.substring(11,13)), end_time:Number(e.reservation_end.substring(11,13)) }])
        })
        setReservationFlag(!reservationFlag)
        setTimeout(() => {
            focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    return (
        <>
            <h1 className='reservation_title'>통합 예약</h1>
            <FacilityComponent props={facilityData} /> <button onClick={() => reservationClick(facilityData.facility_id)} className='reservation_btn'>예약하기</button>
            <Information props={facilityData} />
            <div ref={focusRef} ></div>
            {reservationFlag ? <ReservationComponent  props={facilityData} reserved={reserved} /> : <></>}
        </>
    )
}

export default ReservationPage