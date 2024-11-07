import React, { useEffect, useRef, useState } from 'react';
import FacilityComponent from '../components/FacilityComponent';
import ReservationComponent from '../components/ReservationComponent';
import Information from './../components/Information';
import './ReservationPage.css';
import { getCourt } from '../api/ReservationAPI';
import { useLocation } from 'react-router-dom';

let today = new Date();   

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate(); 


const ReservationPage = () => {
    const [facilityData, setFacilityData] = useState({})
    const [reserved, setReserved] = useState([])
    const [date, setDate] = useState(year + '-' + month + '-' + (day < 10 ? "0"+day : day))
    const [reservationFlag, setReservationFlag] = useState(false)
    const location = useLocation();
    const focusRef = useRef(null);
    const newDate = (date) => {
        setDate(date);
    }
    useEffect(() => {
        getCourt(location.state.facility_id, location.state.court, date)
            .then((e) => {
                setFacilityData(e.facilityVO)
                setReserved(e.btnData)
                console.log(e)
            })
    }, [date])

    const reservationClick = () => {
        setReservationFlag(!reservationFlag)
        setTimeout(() => {
            focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    return (
        <>
            <h1 className='reservation_title'>통합 예약</h1>
            <FacilityComponent props={facilityData} /> <button onClick={() => reservationClick()} className='reservation_btn'>예약하기</button>
            <Information props={facilityData} />
            <div ref={focusRef} ></div>
            {reservationFlag ? <ReservationComponent facilityData={facilityData} reserved={reserved} newDate={newDate} /> : <></>}
        </>
    )
}

export default ReservationPage