import React, { useEffect, useRef, useState } from 'react';
import FacilityComponent from '../../component/reservation/FacilityComponent';
import ReservationComponent from '../../component/reservation/ReservationComponent';
import Information from '../../component/reservation/Infomation';
import '../../css/reservationPage.css';
import { getCourt } from '../../api/reservaionApi';
import { useLocation } from 'react-router-dom';
import Footer from '../../component/Footer';
import Wrapper from '../../component/Wrapper';
import MainNav from '../../component/MainNav';
import BackToTopButton from '../../component/BackToTopButton';
import { useNavigate } from 'react-router-dom';

let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();


const ReservationPage = () => {
    const [facilityData, setFacilityData] = useState({})
    const [reserved, setReserved] = useState([])
    const [date, setDate] = useState(year + '-' + month + '-' + (day < 10 ? "0" + day : day))
    const [reservationFlag, setReservationFlag] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();
    const focusRef = useRef(null);
    const navigate = useNavigate();

    const newDate = (date) => {
        setDate(date);
    }

    useEffect(() => {
        setFacilityData(location.state)
        try {
            setCurrentUser(JSON.parse(localStorage.getItem("user")));
        } catch {
            alert("로그인 후 이용해주세요")
            navigate("/")
        }
    }, [location])

    useEffect(() => {
        getCourt(location.state.facility_id, location.state.court_id, date)
            .then((e) => {
                setReserved(e)
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
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <h1 className='reservation_title'>{facilityData.facility_name} </h1>
            <p className='reservation_title_sub'>SMARTY 센터에 있는 {facilityData.facility_name} 입니다.</p>
            <FacilityComponent facilityData={facilityData} reservation={reservationClick} />
            <Information props={facilityData} />
            <div ref={focusRef} ></div>
            {reservationFlag ? <ReservationComponent facilityData={facilityData} reserved={reserved} newDate={newDate} user={currentUser} /> : <></>}
            <Footer />
        </>
    )
}

export default ReservationPage