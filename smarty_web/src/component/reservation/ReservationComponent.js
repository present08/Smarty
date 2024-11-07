import React, { useEffect, useState } from 'react';
import { LuAlarmClock } from 'react-icons/lu';
import CustomCalender from './CustomCalender.tsx';
import { FaRegCheckSquare } from 'react-icons/fa';
import { updatePlan } from '../../api/ReservationAPI.js';
import moment from 'moment';
import axios from 'axios';

const host = 'http://localhost:8080';

const ReservationComponent = (props) => {

    const { facilityData, reserved, newDate } = props;

    const [currentUser, setCurrentUser] = useState(null);
    const [date, setDate] = useState('');
    const [partTime, setPartTime] = useState(0);
    const [timeLine, setTimeLine] = useState([]);
    const [fristNum, setFristNum] = useState(0);
    const [lastNum, setLastNum] = useState(0);
    const [price, setPrice] = useState(facilityData.basic_fee);
    const [postData, setPostData] = useState({
        reservation_id: null,
        user_id: null,
        court_id: "C_000000",
        reservation_start: "",
        reservation_end: "",
        court_name: "",
        facility_id: facilityData.facility_id,
        court_status: true
    });

    const Date1 = (date) => {
        setDate(date);
        console.log(date);
    };

    useEffect(() => {
        setTimeLine(reserved);
    }, [reserved]);

    const handleClick = (tl) => {
        const newTimeLine = timeLine.map((item) => {
            if (tl.id === item.id) {
                return { ...item, active: 1 };
            }
            return { ...item, active: 0 };
        });
        setTimeLine(newTimeLine);
        setPrice(facilityData.basic_fee);
        extra_price(tl.id);
    };

    const extra_price = (id) => {
        const frist_time = timeLine.find(item => item.id === id)?.start || '';
        const last_time = timeLine.find(item => item.id === id)?.end + 1 || '';
        if (frist_time === timeLine[0].start) {
            setPrice(facilityData.basic_fee - facilityData.basic_fee * facilityData.rate_adjustment);
        } else if (last_time === timeLine[timeLine.length - 1].end) {
            setPrice(facilityData.basic_fee + facilityData.basic_fee * facilityData.rate_adjustment);
        }
    };

    useEffect(() => {
        const frist = timeLine.find(item => item.active === 1)?.start || '';
        const last = timeLine.filter(item => item.active).slice(-1)[0]?.end || '';
        setFristNum(frist < 10 ? '0' + frist : frist);
        setLastNum(last < 10 ? '0' + last : last);
    }, [timeLine]);

    useEffect(() => {
        const start_date = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), fristNum);
        const end_date = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), lastNum);
        setPostData(prevData => ({
            ...prevData,
            user_id: currentUser ? currentUser.user_id : null,
            reservation_start: moment(start_date).format("YYYY-MM-DD HH:mm:ss"),
            reservation_end: moment(end_date).format("YYYY-MM-DD HH:mm:ss"),
        }));
    }, [lastNum, currentUser]);

    const insertReservation = () => {
        updatePlan(postData, facilityData.facility_id)
            .then(e => {
                alert("예약완료");
                setTimeLine(e);
                // postData 초기화
                setPostData({
                    reservation_id: null,
                    user_id: null,
                    court_id: "C_000000",
                    reservation_start: "",
                    reservation_end: "",
                    court_name: "",
                    facility_id: facilityData.facility_id,
                    court_status: true
                });
            })
            .catch(error => {
                console.error("예약 오류:", error);
                alert("예약 중 오류가 발생했습니다. 다시 시도해주세요.");
            });
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${host}/api/auth/me`, { withCredentials: true });
            if (response.status === 200) {
                const user = response.data;
                console.log("현재 로그인된 사용자 정보:", user);
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            } else {
                console.log("사용자가 인증되지 않았습니다.");
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchCurrentUser().then(user => {
            setCurrentUser(user);
        });
    }, []);

    if (!currentUser) {
        return <div>로그인이 필요합니다.</div>; // 로그인 필요시 안내
    }

    return (
        <div className='reservation_container'>
            <CustomCalender newDate={newDate} Date1={Date1} />
            <div>
                <h2 className='reservation_minititle'><LuAlarmClock />  예약 시간 선택</h2>
                <div className='time_list'>
                    {timeLine.map((tl, index) => (
                        <button className={`time_btn ${tl.disabled ? 'disabled' : ''} ${tl.active ? 'active' : ""}`} disabled={tl.disabled} key={index} onClick={() => handleClick(tl)}>
                            {tl.start < 10 ? '0' + tl.start : tl.start}:00 - {tl.end < 10 ? '0' + tl.end : tl.end}:00
                        </button>
                    ))}
                </div>
            </div>
            <div className='reservation_final'>
                <h2 className='reservation_minititle'><FaRegCheckSquare />  체육시설 예약 신청 현황</h2>
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
                <button onClick={insertReservation} className='reservation_btn'>예약하기</button>
            </div>
        </div>
    );
}

export default ReservationComponent;

