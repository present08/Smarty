import React, { useRef, useState } from 'react'
import '../../css/parking.css'
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import MainNav from '../../component/MainNav';
import Footer from '../../component/Footer';
import BackToTopButton from '../../component/BackToTopButton';
import Wrapper from '../../component/Wrapper';

const ParkingIntro = () => {

    //주차요금계산기
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");
    const [fee, setFee] = useState("");

    const calculateFee = () => {
        const firstHalfHourFee = 1000; // 첫 30분 요금
        const perTenMinFee = 600;      // 10분당 요금
        const maxDailyFee = 15000;     // 하루 최대 요금

        const inDate = new Date(inTime);
        const outDate = new Date(outTime);

        // 입차와 출차 시간을 입력하지 않은 경우
        if (inTime === "" || outTime === "") {
            alert("입차 시간과 출차 시간을 모두 입력 해주세요.");
            setFee("");
            return;
        }

        // 출차 시간이 입차 시간보다 빠르거나 같은 경우
        if (outDate <= inDate) {
            alert("출차 시간이 입차 시간보다 같거나 빠릅니다. 날짜를 다시 확인 해주세요.");
            setInTime("");
            setOutTime("");
            setFee("");
            return;
        }

        let totalFee = 0;
        let currentTime = new Date(inDate);
        let firstHalfHourApplied = false; // 첫 30분 요금이 적용되었는지 체크

        while (currentTime.toDateString() !== outDate.toDateString()) {
            // 첫날과 마지막 날을 구분하여 요금 계산
            let endOfDay = new Date(currentTime);
            endOfDay.setHours(23, 59, 59);

            let dailyFee = calculateDailyFee(currentTime, endOfDay, firstHalfHourFee, perTenMinFee, maxDailyFee, firstHalfHourApplied);
            totalFee += dailyFee;

            firstHalfHourApplied = true; // 첫 30분 요금이 적용됨

            currentTime.setDate(currentTime.getDate() + 1);
            currentTime.setHours(0, 0, 0);
        }

        // 마지막 날 요금 계산
        totalFee += calculateDailyFee(currentTime, outDate, firstHalfHourFee, perTenMinFee, maxDailyFee, firstHalfHourApplied);

        setFee(totalFee);
    };

    // 일일 요금 계산 함수
    const calculateDailyFee = (startTime, endTime, firstHalfHourFee, perTenMinFee, maxDailyFee, firstHalfHourApplied) => {
        let duration = (endTime - startTime) / 60000; // 분 단위로 변환
        let dailyFee = 0;

        // 첫 30분 요금이 적용되지 않은 경우에만 첫 30분 요금 추가
        if (!firstHalfHourApplied && duration > 0) {
            dailyFee += firstHalfHourFee;
            duration -= 30;
        }

        // 나머지 시간에 대한 10분당 요금 적용
        while (duration > 0) {
            dailyFee += perTenMinFee;
            duration -= 10;

            // 하루 최대 요금 초과 시 최대 요금 적용
            if (dailyFee >= maxDailyFee) {
                dailyFee = maxDailyFee;
                break;
            }
        }
        return dailyFee;
    };

    const UIIntime = inTime.substring(0, 16);
    const replaceIntime = UIIntime.replace('T', ' ');
    const UIOuttime = outTime.substring(0, 16);
    const replaceOuttime = UIOuttime.replace('T', ' ');


    // 모달창
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();


    return (
        <>
            <MainNav />
            <Wrapper>
                <BackToTopButton />
                <div className='parking-container' >
                    <div className='submu'>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/center_in" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>센터소개</Link>
                            <p >&gt;</p>
                            <Link to="/center_in/parking" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>주차안내</Link>
                        </nav>
                    </div>
                    <div className='parking-cont' >
                        <h3>주차안내</h3>
                        <div className='parking-map'>
                            <div>
                                <ul>주차장 위치
                                    <li>
                                        주소 : 경기 성남시 분당구 금곡동 169
                                    </li>
                                    <li>
                                        지하철 : 신분당, 수인분당/미금역 6번출구
                                    </li>
                                    <li>
                                        운영시간 : 00:00 ~ 24:00
                                    </li>
                                    <li>
                                        연락처 : 031 - 712 - 7447
                                    </li>
                                </ul>
                            </div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.6686751117018!2d127.10460207658447!3d37.35035197209553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b59c6fd9f7d31%3A0xbdbad7e886eacc85!2z6re466aw7Lu07ZOo7YSw7JWE7Lm0642w66-47ZWZ7JuQIOyEseuCqOu2hOuLueuvuOq4iOyXreygkA!5e0!3m2!1sko!2skr!4v1729472572666!5m2!1sko!2skr"
                                width="80%"
                                height="300px"
                                style={{ border: '0' }}
                                allowfullscreen=""
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                        <div className='intro-container'>
                            {/* 주차요금계산기 모달창 */}
                            <div className='btn-wrapper'>
                                <div className='charge-header'>
                                    <h3>주차요금</h3>
                                    <button
                                        className='modal-open-btn'
                                        onClick={() => setModalOpen(true)}>
                                        예상 주차요금 확인하기
                                    </button>
                                </div>
                                <div className='charge-container'>
                                    <div className='charge-cont'>
                                        <p>일반요금</p>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>구분</th>
                                                    <th>소형</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowSpan={3}>금곡동 공영 주차장</td>
                                                    <td>
                                                        30분 1000원
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>이후 10분당 600원</td>
                                                </tr>
                                                <tr>
                                                    <td>하루 최대 15000원 </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p style={{ marginTop: '0.5rem' }}>운영시간</p>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>요일</th>
                                                    <th>시간</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>평일</td>
                                                    <td rowSpan={4}>00:00 ~ 24:00</td>
                                                </tr>
                                                <tr>
                                                    <td>토요일</td>
                                                </tr>
                                                <tr>
                                                    <td>일요일</td>
                                                </tr>
                                                <tr>
                                                    <td>공휴일</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {
                                modalOpen &&
                                <div
                                    className='modal-container' ref={modalBackground}
                                    onClick={e => {
                                        if (e.target === modalBackground.current) {
                                            setModalOpen(false);
                                        }
                                    }}>
                                    <div className='modal-content'>
                                        <AiOutlineClose className='modal-close-btn'
                                            onClick={() => setModalOpen(false)}
                                        />
                                        <div className='clac-container'>
                                            <p>주차 요금 계산기</p>
                                            <div className='calc'>
                                                <label style={{ color: 'white' }}>입차 시간</label>
                                                <input
                                                    type="datetime-local"
                                                    value={inTime}
                                                    onChange={(e) => setInTime(e.target.value)}
                                                />
                                                <label style={{ color: 'white' }}>출차 시간</label>
                                                <input
                                                    type="datetime-local"
                                                    value={outTime}
                                                    onChange={(e) => setOutTime(e.target.value)}
                                                />
                                            </div>
                                            <div className='division-container'>
                                            </div>
                                            <button className='clac-button'
                                                onClick={calculateFee}>
                                                요금 계산
                                            </button>
                                            <div className='total' >
                                                <h3>주차 요금</h3>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>날짜</th>
                                                            <th>가격</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{replaceIntime}~{replaceOuttime}</td>
                                                            <td>
                                                                {fee} 원
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div >
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div >
            </Wrapper>
            <Footer />
        </>
    )
}

export default ParkingIntro



