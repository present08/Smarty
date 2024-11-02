import React, { useEffect, useState } from 'react';
import FacilityComponent from '../components/FacilityComponent';
import ReservationComponent from '../components/ReservationComponent';
import Information from './../components/Information';
import './ReservationPage.css';
import axios from 'axios'

const HOST = 'http://localhost:8080'
const ReservationPage = () => {
    const [facilityData, setFacilityData] = useState({})
    const [timeData, setTimeData] = useState({})
    useEffect(() => {
        const param = "수영장";
        const res = async () => {
            const response = await axios.get(`${HOST}/api/reservation/?param=${param}`)
            setFacilityData(response.data)
            setTimeData({start:Number(response.data.open_time.substring(0,2)) ,end:Number((response.data.close_time).substring(0,2)),default:response.data.default_time})
        }
        res()
    }, [])

    return (
        <>
            <h1 className='reservation_title'>통합 예약</h1>
            <FacilityComponent props={facilityData}/> <button className='reservation_btn'>예약하기</button>
            <Information props={facilityData} />
            <ReservationComponent props={timeData}/>
        </>
    )
}

export default ReservationPage