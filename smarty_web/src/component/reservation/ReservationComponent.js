import React, { useEffect, useState } from 'react';
import { LuAlarmClock } from 'react-icons/lu';
import CustomCalender from './CustomCalender.tsx';
import { FaRegCheckSquare } from 'react-icons/fa';
import { updatePlan } from '../../api/reservaionApi.js';
import moment from 'moment';
import ReservationComplete from './ReservationComplete.js';


const ReservationComponent = (props) => {
    const { facilityData, reserved, newDate, user } = props;
    const [date, setDate] = useState('')
    const [timeLine, setTimeLine] = useState([])
    const [fristNum, setFristNum] = useState(0)
    const [lastNum, setLastNum] = useState(0)
    const [complete, setComplete] = useState(false)
    const [price, setPrice] = useState(facilityData.basic_fee)
    const initData = {
        reservation_id: null,
        user_id: "",
        court_id: "",
        reservation_start: "",
        reservation_end: "",
        court_name: "",
        facility_id: facilityData.facility_id,
        court_status: true
    }
    const [postData, setPostData] = useState(initData)

    useEffect(() => {
    }, []);
    // calendar props date Data
    const Date1 = (date) => {
        setDate(date);
        console.log(date)
    }
    useEffect(() => {
        setTimeLine(reserved)
    }, [reserved])

    const handleClick = (tl) => {
        const newTimeLine = timeLine.map((item) => {
            if (tl.id === item.id) {
                return { ...item, active: 1 }
            }
            return { ...item, active: 0 }
        })
        setTimeLine(newTimeLine)
        // console.log(tl.id)
        setPrice(facilityData.basic_fee)
        extra_price(tl.id)
    };

    const extra_price = (id) => {
        const frist_time = timeLine.find(item => item.id === id)?.start || ''
        const last_time = timeLine.find(item => item.id === id)?.end + 1 || ''
        if (frist_time == timeLine[0].start) {
            console.log(facilityData.basic_fee - facilityData.basic_fee * facilityData.rate_adjustment)
            setPrice(facilityData.basic_fee - facilityData.basic_fee * facilityData.rate_adjustment)
        } else if (last_time == timeLine[timeLine.length - 1].end) {
            setPrice(facilityData.basic_fee + facilityData.basic_fee * facilityData.rate_adjustment)
            console.log(facilityData.basic_fee + facilityData.basic_fee * facilityData.rate_adjustment)
        }
    }

    useEffect(() => {
        const frist = timeLine.find(item => item.active == 1)?.start || ''
        const last = timeLine.filter(item => item.active).slice(-1)[0]?.end || ''
        frist < 10 ? setFristNum('0' + frist) : setFristNum(frist)
        last < 10 ? setLastNum('0' + last) : setLastNum(last)
    }, [handleClick])

    useEffect(() => {
        const start_date = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), fristNum);
        const end_date = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), lastNum);
        setPostData({
            reservation_id: null,
            court_id: facilityData.court_id,
            court_name: facilityData.court_name,
            court_status: true,
            facility_id: facilityData.facility_id,
            user_id: user.user_id,
            reservation_start: moment(start_date).format("YYYY-MM-DD HH:mm:ss"),
            reservation_end: moment(end_date).format("YYYY-MM-DD HH:mm:ss"),
        })

        // console.log(moment(start_date).format("YYYY-MM-DD HH:mm:ss"))
        // console.log(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
    }, [lastNum])

    const insertReservation = () => {
        updatePlan(postData, facilityData.facility_id)
            .then(e => {
                alert("예약완료")
                setTimeLine(e)
            })
        setComplete(!complete)
    }

    const closeModal = (e) => {
        setComplete(e)
    }

    return (
        <div className='reservation_container'>
            <CustomCalender newDate={newDate} Date1={Date1} />
            <div>
                <h2 className='reservation_minititle'><LuAlarmClock />  예약 시간 선택</h2>
                <div className='reservaiotn_time_list'>
                    {timeLine.map((tl, index) => (
                        <button className={`reservation_time_btn ${tl.disabled ? 'disabled' : ''} ${tl.active ? 'active' : ""}`} disabled={tl.disabled} key={index} onClick={() => handleClick(tl)}>
                            {tl.start < 10 ? '0' + tl.start : tl.start}:00 - {tl.end < 10 ? '0' + tl.end : tl.end}:00
                        </button>
                    ))}
                </div>
            </div>
            <div className='reservation_final'>
                <h2 className='reservation_minititle'><FaRegCheckSquare />  체육시설 예약 확인</h2>
                <table className='reservation_option'>
                    <colgroup>
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '40%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '20%' }} />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">시설명</th>
                            <th scope="col">예약일자</th>
                            <th scope="col">예약시간</th>
                            <th scope="col">이용요금</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        <tr>
                            <td data-content="시설명">{facilityData.facility_name}</td>
                            <td data-content="예약일자">{date}</td>
                            <td data-content="예약시간">{fristNum + ':00 ~ '}{lastNum + ':00'}</td>
                            <td data-content="이용요금">{price}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={insertReservation} className='reservation_btn'>선택완료</button>
            </div>
            {complete ? <ReservationComplete postData={postData} facilityData={facilityData} user={user} price={price} closeModal={closeModal} /> : <></>}
        </div>
    )
}

export default ReservationComponent