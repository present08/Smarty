import React from 'react'
import MainNav from '../../component/MainNav';
import Wrapper from '../../component/Wrapper';
import Footer from '../../component/Footer';
import BackToTopButton from '../../component/BackToTopButton';
import Refund from '../../component/guide/Refund';
import '../../css/refund.css'


const RefundPage = () => {
    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <Refund />
            <Footer />
        </>
    )
}

export default RefundPage;