import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../component/Footer';
import Wrapper from '../../component/Wrapper';
import MainNav from '../../component/MainNav';
import BackToTopButton from '../../component/BackToTopButton';
import { useLocation } from 'react-router-dom';
import { classEnroll } from '../../api/classAPI';



const ReservationPage = () => {
    const [enrollData, setEnrollData] = useState({ user_id: '', class_id: '' })
    const location = useLocation();

    useEffect(() => {
        const user = JSON.parse(localStorage.user)
        setEnrollData({ user_id: user.user_id, class_id: location.state.class_id })
    }, [])


    const enroll = () => {
        classEnroll(enrollData).then(e => console.log(e))
    }

    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <button onClick={enroll}>신청하기</button>
            <Footer />
        </>
    )
}

export default ReservationPage