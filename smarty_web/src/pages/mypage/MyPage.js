import React, { useEffect, useState } from 'react';
import DashboardBack from '../../component/DashboardBack';
import UserInformation from '../../component/mypage/UserInformation';
import UserRating from '../../component/mypage/UserRating';
import UserCalendar from '../../component/mypage/UserCalendar';
import UserReservation from '../../component/mypage/UserReservation';
import { AiFillSmile } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { TbLogout2 } from 'react-icons/tb';
import UserButton from '../../component/mypage/UserButton';
import CancellationButton from '../../component/mypage/CancellationButton';
import { CiBellOff } from 'react-icons/ci';
import ReceiptButton from '../../component/mypage/ReceiptButton';
import UserNavber from '../../component/mypage/UserNavber';
import QrButton from '../../component/mypage/QrButton';
import UserGrade from '../../component/mypage/UserGrade';
import { logout } from '../../api/userApi';
import UserCoupon from '../../component/mypage/UserCoupon';

const MyPage = () => {

    const [isOn, setIsOn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Nav에서 전달된 데이터 받아오기
    const location = useLocation();
    useEffect(() => {
        console.log(location.state)
        // sessionStorage.setItem('user', JSON.stringify(location.state.user))
        
        setCurrentUser(location.state.user)
    }, [location])


    // 종 모양(알림) 변경
    const toggleButton = () => {
        setIsOn(prev => !prev);
    };

    const handleLogout = () => {
        logout().then(e => {
            alert("로그아웃 성공");
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('user', "")
        }).catch((error) => {
            console.log("로그인 상태 확인 중 에러 발생: ", error);
        })
    };


    return (
        <DashboardBack>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '80vw', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                    <div style={{ display: 'flex', width: '90%', height: '70px', alignItems: 'center', marginBottom: '3rem', justifyContent: 'space-between', position: 'relative' }}>
                        {currentUser && <h1 style={{ fontSize: '28px', display: 'flex', width: '40%' }}>Hello~{currentUser.user_name}님 환영합니다~<AiFillSmile /></h1>}
                        <div style={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <UserCoupon user={currentUser}/>
                            <UserGrade user={currentUser} />
                            <QrButton user={currentUser} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '90%', height: '350px', justifyContent: 'space-between' }}>
                        <UserInformation user={currentUser} />
                        <UserRating user={currentUser} />
                    </div>
                    <div style={{ display: 'flex', width: '90%', height: '350px', justifyContent: 'space-between' }}>
                        <UserCalendar user={currentUser} />
                        <UserReservation user={currentUser} />
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
                            width: '80%', display: 'flex', justifyContent: 'flex-end', marginRight: '2rem'
                        }}>
                            <Link to={"/"}><h1 style={{ fontSize: '35px', color: '#17468c', }}>SMARTY</h1></Link>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '30%', }}>
                        <div style={{ width: '90%', height: '5%', margin: '0 auto', marginBottom: '1.5rem' }}>
                            <h2 style={{ color: '#003f66', fontSize: '21px', marginBottom: '3rem', display: 'flex', }}>SUBMENU</h2>
                        </div>
                        <div style={{ width: '100%', height: '100%' }}>
                            <UserNavber />
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                        <div style={{ width: '90%', height: '5%', margin: '0 auto', marginBottom: '2rem' }}>
                            <h2 style={{ color: '#003f66', fontSize: '21px', marginBottom: '3rem', display: 'flex', }}>SUB BOX</h2>
                        </div>
                        <UserButton user={currentUser} />
                        <CancellationButton user={currentUser} />
                        <ReceiptButton user={currentUser} />
                    </div>
                    <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link onClick={handleLogout} to={"/"} style={{ display: 'flex', alignItems: 'center', color: 'black', cursor: 'pointer' }} >
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
