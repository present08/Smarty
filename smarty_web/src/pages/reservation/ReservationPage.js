import React, { useEffect, useRef, useState } from 'react';
import FacilityComponent from '../../component/reservation/FacilityComponent';
import ReservationComponent from '../../component/reservation/ReservationComponent';
import Information from '../../component/reservation/Infomation';
import '../../css/reservationPage.css';
import { getCourt } from '../../api/ReservationAPI';
import { useLocation } from 'react-router-dom';

let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();


const ReservationPage = () => {
    const [facilityData, setFacilityData] = useState({})
    const [reserved, setReserved] = useState([])
    const [date, setDate] = useState(year + '-' + month + '-' + (day < 10 ? "0" + day : day))
    const [reservationFlag, setReservationFlag] = useState(false)
    const location = useLocation();
    const focusRef = useRef(null);
    const newDate = (date) => {
        setDate(date);
    }
    useEffect(() => {
        setFacilityData(location.state)
        console.log("getLocation", location.state)
    }, [location])

    useEffect(() => {
        getCourt(location.state.facility_id, location.state.court_id, date)
            .then((e) => {
                setReserved(e)
                console.log("btndata ", e)
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