import React, { useEffect, useState } from 'react';
import DashboardBack from '../DashboardBack';
import UserInformation from './UserInformation';
import UserRating from './UserRating';
import UserCalendar from './UserCalendar';
import UserReservation from './UserReservation';
import axios from 'axios';
import { AiFillSmile, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TbLogout2 } from 'react-icons/tb';
import UserButton from './UserButton';
import SituationButton from './CancellationButton';
import { CiBellOff } from 'react-icons/ci';
import ReceiptButton from './ReceiptButton';
import UserNavber from './UserNavber';
import QrButton from './QrButton';
import UserGrade from './UserGrade';
import { getReservationInfo } from '../../api/userApi';

const host = 'http://localhost:8080';

const MyPage = () => {

    const [isOn, setIsOn] = useState(false);
    const [userId, setUserId] = useState('');

    const toggleButton = () => {
        setIsOn(prev => !prev);
    };

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const response = await axios.get(`${host}/api/auth/status`, { withCredentials: true });
    //             setIsLoggedIn(response.data.isLoggedIn);
    //             localStorage.setItem('isLoggedIn', response.data.isLoggedIn);
    //         } catch (error) {
    //             console.log("로그인 상태 확인 중 에러 발생: ", error);
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);


    const handleLogout = async () => {
        try {
            await axios.post(`${host}/api/auth/logout`, {}, { withCredentials: true });
            alert("로그아웃 성공");
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
            window.location.reload(); // 새로고침
        } catch (error) {
            alert('로그아웃 중 오류 발생: ', error);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${host}/api/auth/me`, { withCredentials: true });
            if (response.status === 200) {
                const user = response.data;
                console.log("현재 로그인된 사용자 정보:", user);
                setUserId(user.user_id)
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

    useEffect(() => {
        console.log(userId)
        getReservationInfo(userId).then(e => console.log(e));
    }, [currentUser])
    


    return (
        <DashboardBack>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '80vw', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                    <div style={{ display: 'flex', width: '90%', height: '70px', alignItems: 'center', marginBottom: '3rem', justifyContent: 'space-between', position: 'relative' }}>
                        {currentUser && <h3 style={{ fontSize: '28px', display: 'flex', width: '30%' }}>Hello~{currentUser.user_name}님 환영합니다~<AiFillSmile /></h3>}
                        <div style={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <UserGrade userId={currentUser ? currentUser.user_id : null} />
                            <QrButton userId={currentUser ? currentUser.user_id : null} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '90%', height: '350px', justifyContent: 'space-between' }}>
                        <UserInformation />
                        <UserRating />
                    </div>
                    <div style={{ display: 'flex', width: '90%', height: '350px', justifyContent: 'space-between' }}>
                        <UserCalendar  />
                        <UserReservation />
                    </div>
                </div>
                <div style={{
                    width: '20vw', height: '90vh', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', backgroundColor: 'white', boxShadow: '-6px 0px 5px rgba(0, 0, 0, 0.1)',
                }}>
                    <div style={{
                        width: '100%', height: "15%", display: 'flex', alignItems: 'center',
                    }}>
                        <div style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                            <CiBellOff onClick={toggleButton} style={{ width: '30px', height: '30px', marginRight: '0.5rem', marginLeft: '0.5rem' }} />
                            <button style={{ padding: '10px', backgroundColor: isOn ? 'green' : 'red', color: 'white', border: 'none', borderRadius: '50px' }}>
                                {isOn ? 'ON' : 'OFF'}
                            </button>
                        </div>
                        <div style={{
                            width: '80%', display: 'flex', justifyContent: 'flex-end', marginRight: '1rem'
                        }}>
                            <Link to={"/"}><h3 style={{ fontSize: '35px', color: '#17468c', }}>SMARTY</h3></Link>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '30%', }}>
                        <div style={{ width: '90%', height: '5%', margin: '0 auto', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#003f66', fontSize: '21px', marginBottom: '3rem', display: 'flex', }}>SUBMENU</h3>
                        </div>
                        <div style={{ width: '100%', height: '100%' }}>
                            <UserNavber />
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                        <div style={{ width: '90%', height: '5%', margin: '0 auto', marginBottom: '2rem' }}>
                            <h3 style={{ color: '#003f66', fontSize: '21px', marginBottom: '3rem', display: 'flex', }}>SUB BOX</h3>
                        </div>
                        <UserButton />
                        <SituationButton />
                        <ReceiptButton />
                    </div>
                    <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to={"/"} style={{ display: 'flex', alignItems: 'center', color: 'black' }} onClick={handleLogout}>
                            <TbLogout2 style={{ width: '30px', height: '30px', marginRight: '0.3rem', color: 'black' }} />
                            <span style={{ fontSize: '23px' }}>Logout</span>
                        </Link>
                    </div>
                </div>
            </div >
        </DashboardBack >
    );
}

export default MyPage;
