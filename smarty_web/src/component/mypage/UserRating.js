import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from '../chart/BarChart';
import DoughnutChart from '../chart/DoughnutChart';
import axiosInstance from '../../api/axiosInstance';
const host = 'http://localhost:8080/api/auth';

const UserRating = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [usageData, setUsageData] = useState([]); // 바 차트 데이터 상태 추가
    const [usageTime, setUsageTime] = useState([]); // 도넛 차트 사용 시간 상태 추가
    const [reservationInfo, setReservationInfo] = useState([]);
    const [facilities, setFacilities] = useState([]); // 시설 이름 상태 추가

    // 현재 사용자 정보 가져오기
    const fetchCurrentUser = async () => {
        try {
            // const response = await axios.get(`${host}/me`, { withCredentials: true });
            const response = await axiosInstance.get(`/security/status`, { withCredentials: true });
            console.log("사용자 정보 : ", response.data.user)
            if (response.status === 200) {
                // const user = response.data;
                const user = response.data.user;
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

    // 예약 정보 가져오기
    const getReservationInfo = async (user_id) => {
        try {
            // const response = await axios.get(`${host}/reservationUser`, { params: { user_id } });
            const response = await axiosInstance.get(`/auth/reservationUser`, { params: { user_id } });
            console.log(response.data);
            return response.data; // 예약 정보를 반환
        } catch (error) {
            console.error("Error fetching reservation info:", error);
        }
    };

    // 사용자 데이터 및 예약 정보 로드
    useEffect(() => {
        const loadUserData = async () => {
            const user = await fetchCurrentUser();
            if (user) {
                setCurrentUser(user);
                const reservations = await getReservationInfo(user.user_id);
                setReservationInfo(reservations);

                const facilityCounts = {};
                const facilityTimes = {};

                // 예약 정보에서 시설별 이용 횟수 및 사용 시간 집계
                reservations.forEach(reservation => {
                    const facilityName = reservation.facility_name; // 시설물 이름
                    const startTime = new Date(reservation.reservation_start);
                    const endTime = new Date(reservation.reservation_end);
                    const usageDuration = (endTime - startTime) / 1000 / 60; // 사용 시간을 분 단위로 계산

                    // 이용 횟수 집계
                    if (facilityCounts[facilityName]) {
                        facilityCounts[facilityName] += 1; // 이미 존재하면 카운트 증가
                    } else {
                        facilityCounts[facilityName] = 1; // 처음 발생하면 1로 초기화
                    }

                    // 사용 시간 집계
                    if (facilityTimes[facilityName]) {
                        facilityTimes[facilityName] += usageDuration; // 기존 사용 시간에 추가
                    } else {
                        facilityTimes[facilityName] = usageDuration; // 처음 발생하면 사용 시간을 초기화
                    }
                });

                // 이용 횟수 배열로 변환
                const usageCounts = Object.keys(facilityCounts).map(facility => facilityCounts[facility]);
                const facilityNames = Object.keys(facilityCounts); // 시설 이름 배열

                // 사용 시간 배열로 변환
                const usageDurations = Object.keys(facilityTimes).map(facility => facilityTimes[facility]);

                setUsageData(usageCounts); // 바 차트 데이터 설정
                setFacilities(facilityNames); // 시설 이름 상태 설정
                setUsageTime(usageDurations); // 도넛 차트 데이터 설정
            }
        };
        loadUserData();
    }, []);

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', width: '52%', height: '350px',
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '30px',
                alignItems: 'center'
            }}>
                <h3 style={{ fontSize: '23px', marginBottom: '1rem', color: '#003f66' }}>활동내역</h3>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '300px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ width: '95%', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1.5rem' }}>
                        <BarChart usageData={usageData} facilities={facilities} /> {/* 바 차트에 데이터 전달 */}
                    </div>
                    <div style={{ width: '40%', height: '90%', backgroundColor: '#f0f3fa', borderRadius: '15px' }}>
                        <DoughnutChart usageData={usageTime} facilities={facilities} /> {/* 도넛 차트에 데이터 전달 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRating;
