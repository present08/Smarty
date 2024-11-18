import React, { useEffect, useState } from 'react'
import { getfacilityId } from '../../api//reservaionApi';
import MainNav from '../../component/MainNav';
import Wrapper from '../../component/Wrapper';
import Footer from '../../component/Footer';
import BackToTopButton from '../../component/BackToTopButton';
import '../../css/operatinghoursPage.css'
import Operatinghours from '../../component/guide/Operatinghours';

const OperatinghoursPage = () => {

    const [facility_id, setFacility_id] = useState([])

    useEffect(() => {
        getfacilityId().then(e => {
            e.map(i => {
                if (facility_id.length < e.length) {
                    setFacility_id(prev => [...prev, i]);
                }
                console.log(i)
            });
        })
    }, [])


    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <Operatinghours facility={facility_id} />
            <Footer />
        </>
    )
}

export default OperatinghoursPage