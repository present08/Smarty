import React from 'react'
import MainNav from '../../component/MainNav';
import Wrapper from '../../component/Wrapper';
import Footer from '../../component/Footer';
import BackToTopButton from '../../component/BackToTopButton';
import '../../css/instructions.css'
import Reservationinformation from '../../component/guide/Reservationinformation';


const Instructions = () => {

    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <Reservationinformation />
            <Footer />
        </>
    )
};

export default Instructions;

