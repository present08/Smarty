import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaRegCheckSquare } from 'react-icons/fa';
import { LuAlarmClock } from 'react-icons/lu';
import { MembershipUser, updatePlan } from './../../api/reservaionApi';
import CustomCalender from './CustomCalender.tsx';
import ReservationComplete from './ReservationComplete.js';


const ReservationComponent = (props) => {
    const { facilityData, reserved, newDate, user } = props;
    const [date, setDate] = useState('')
    const [timeLine, setTimeLine] = useState([])
    const [timeList, setTimeList] = useState([])
    const [resTimeLine, setResTimeLine] = useState([])
    const [fristNum, setFristNum] = useState(0)
    const [lastNum, setLastNum] = useState(0)
    const [complete, setComplete] = useState(false)
    const [price, setPrice] = useState(facilityData.basic_fee)
    const [Dprice, setDPrice] = useState(facilityData.basic_fee)
    const [membership, setMembership] = useState("")
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

    // calendar props date Data
    const Date1 = (date) => {
        setDate(date);
    }
    useEffect(() => {
        setTimeLine(reserved)
    }, [reserved])

    useEffect(() => {
        // 3 / 5 / 7 / 10
        MembershipUser(user.user_id).then(e => {
            setMembership(e);
            switch (e) {
                case "브론즈": setDPrice(facilityData.basic_fee); break;
                case "실버": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.03)) / 10) * 10); break;
                case "골드": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.05)) / 10) * 10); break;
                case "플래티넘": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.07)) / 10) * 10); break;
                case "다이아": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.1)) / 10) * 10); break;
            }
        })
    }, [])


    // 첫타임/막타임 할인/할증요금 계산
    const extra_price = (id) => {
        const frist_time = timeLine.find(item => item.id === id)?.start || ''
        const last_time = timeLine.find(item => item.id === id)?.end + 1 || ''
        if (frist_time == timeLine[0].start) {
            const minusPrice = facilityData.basic_fee - (facilityData.basic_fee * facilityData.rate_adjustment);
            setPrice(facilityData.basic_fee - facilityData.basic_fee * facilityData.rate_adjustment)
            // 복리계산
            switch (membership) {
                case "브론즈": setDPrice(facilityData.basic_fee); break;
                case "실버": setDPrice(Math.floor((minusPrice - (minusPrice * 0.03)) / 10) * 10); break;
                case "골드": setDPrice(Math.floor((minusPrice - (minusPrice * 0.05)) / 10) * 10); break;
                case "플래티넘": setDPrice(Math.floor((minusPrice - (minusPrice * 0.07)) / 10) * 10); break;
                case "다이아": setDPrice(Math.floor((minusPrice - (minusPrice * 0.1)) / 10) * 10); break;
            }
        } else if (id == Math.floor(timeLine.length / facilityData.default_time) - 1) {
            setPrice(facilityData.basic_fee + facilityData.basic_fee * facilityData.rate_adjustment)
            const plusPrice = facilityData.basic_fee + (facilityData.basic_fee * facilityData.rate_adjustment);
            switch (membership) {
                case "브론즈": setDPrice(facilityData.basic_fee); break;
                case "실버": setDPrice(Math.floor((plusPrice - (plusPrice * 0.03)) / 10) * 10); break;
                case "골드": setDPrice(Math.floor((plusPrice - (plusPrice * 0.05)) / 10) * 10); break;
                case "플래티넘": setDPrice(Math.floor((plusPrice - (plusPrice * 0.07)) / 10) * 10); break;
                case "다이아": setDPrice(Math.floor((plusPrice - (plusPrice * 0.1)) / 10) * 10); break;
            }
        } else {
            switch (membership) {
                case "브론즈": setDPrice(facilityData.basic_fee); break;
                case "실버": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.03)) / 10) * 10); break;
                case "골드": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.05)) / 10) * 10); break;
                case "플래티넘": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.07)) / 10) * 10); break;
                case "다이아": setDPrice(Math.floor((facilityData.basic_fee - (facilityData.basic_fee * 0.1)) / 10) * 10); break;
            }
        }
    }

    // 시간 버튼 클릭하면 Default time의 set버튼들 모두 선택 기능
    const handleClick = (tl) => {
        const newTimeLine = timeLine.map((item) => {
            if (tl.id === item.id) {
                return { ...item, active: 1 }
            }
            return { ...item, active: 0 }
        })
        setTimeLine(newTimeLine)
        setPrice(facilityData.basic_fee)
        extra_price(tl.id)
    };

    useEffect(() => {
        // 클릭된 버튼의 타임별 첫시간 ~ 끝시간 저장
        const frist = timeLine.find(item => item.active == 1)?.start || ''
        const last = timeLine.filter(item => item.active).slice(-1)[0]?.end || ''
        frist < 10 ? setFristNum('0' + frist) : setFristNum(frist)
        last < 10 ? setLastNum('0' + last) : setLastNum(last)

        // Server에 전송할 데이터 저장
        setPostData({
            reservation_id: null,
            court_id: facilityData.court_id,
            court_name: facilityData.court_name,
            court_status: true,
            facility_id: facilityData.facility_id,
            user_id: user.user_id,
            reservation_start: moment(new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), frist < 10 ? '0' + frist : frist)).format("YYYY-MM-DD HH:mm:ss"),
            reservation_end: moment(new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), last < 10 ? '0' + last : last)).format("YYYY-MM-DD HH:mm:ss"),
            amount: (membership != "브론즈" ? Dprice : price)
        })
    }, [timeLine])

    // server 전송
    const insertReservation = () => {
        updatePlan(postData, facilityData.facility_id)
            .then(e => {
                if (e.iterable != 0) {
                    alert("연속적으로 예약할수 없습니다.")
                } else {
                    setPostData(prevData => ({
                        ...prevData,
                        reservation_id: e.reservation_id
                    }));
                    reservationPayment()
                }
            })
    }

    const closeModal = (e, btnData) => {
        setComplete(e)
        setTimeLine(btnData)
    }

    const reservationPayment = () => {
        // iamport Payment System
        const { IMP } = window
        IMP.init("imp57034437");

        const data = {
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: (membership != "브론즈" ? Dprice : price),
            name: facilityData.facility_name,
            buyer_name: user.user_id,
        };

        IMP.request_pay(data, function nextFunc(success) {
            if (success.success) {
                setComplete(!complete)
                setResTimeLine(timeList)
            } else {
                alert(success.error_msg)
            }
        })
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
                            <td data-content="이용요금">{membership != "브론즈" ? <><span style={{ textDecoration: 'line-through', color: 'gray', fontSize: '15px', marginRight: "5px" }}> {price} </span> <span style={{ fontWeight: "bold" }}>{Dprice}</span></> : price}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={insertReservation} className='reservation_btn'>선택완료</button>
                <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
                <script src="/main.js"></script>
            </div>
            {complete ? <ReservationComplete postData={postData} facilityData={facilityData} user={user} price={Dprice} closeModal={closeModal} /> : <></>}
        </div>
    )
}

export default ReservationComponent