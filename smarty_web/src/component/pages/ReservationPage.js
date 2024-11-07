import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FacilityComponent from '../reservation/FacilityComponent';
import Information from '../reservation/Information';
import ReservationComponent from '../reservation/ReservationComponent';
import { getCourt } from '../../api/ReservationAPI';
import '../../css/ReservationPage.css'
import MainNav from '../MainNav';
import Wrapper from '../Wrapper';
import Footer from '../Footer';


let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();


const ReservationPage = () => {
    const [facilityData, setFacilityData] = useState({})
    const [reserved, setReserved] = useState([])
    const [date, setDate] = useState(year + '-' + month + '-' + (day < 10 ? "0" + day : day))
    const [reservationFlag, setReservationFlag] = useState(false)
    const [userId, setUserId] = useState('')
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
            console.log(localStorage.getItem('user'))
            setUserId(localStorage.getItem('user'));
    }, [date])

    const reservationClick = () => {
        setReservationFlag(!reservationFlag)
        setTimeout(() => {
            focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    return (
        <>
            <MainNav/>
            <Wrapper />
            <h1 className='reservation_title'>통합 예약</h1>
            <FacilityComponent props={facilityData} />
            <div className='buttonBox'>
                <div>
                    <button onClick={() => reservationClick()} className='reservation_btn'>예약하기</button>
                </div>
            </div>

            <Information props={facilityData} />
            <div ref={focusRef} ></div>
            {reservationFlag ? <ReservationComponent facilityData={facilityData} reserved={reserved} newDate={newDate} userId={userId}/> : <></>}
            <Footer />
        </>
    )
}

export default ReservationPage;