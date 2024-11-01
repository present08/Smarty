import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

const host = 'http://localhost:8080';

const UserButton = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${host}/api/auth/me`, { withCredentials: true });
            if (response.status === 200) {
                const user = response.data;
                console.log("현재 로그인된 사용자 정보:", user);
                localStorage.setItem("user", JSON.stringify(user)); // JSON.stringify 사용
                return user;
            } else {
                console.log("사용자가 인증되지 않았습니다.");
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
            return null; // 에러 발생 시 null 반환
        }
    };

    useEffect(() => {
        fetchCurrentUser().then(user => {
            setCurrentUser(user);
            if (user) {
                setAddress(user.address || ''); // 기존 주소로 상태 초기화
                setPhone(user.phone || ''); // 기존 전화번호로 상태 초기화
            }
        });
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAddress(''); // 입력 필드 초기화
        setPhone(''); // 입력 필드 초기화
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        const userInfo = { user_id: currentUser.user_id, address, phone }; // user_id로 변경

        console.log("전송할 사용자 정보:", userInfo); // 디버깅을 위한 로그

        try {
            const response = await axios.put(`${host}/api/auth/info`, userInfo);
            alert('변경 완료되었습니다. 재로그인해주세요!');
            closeModal();
        } catch (error) {
            console.error('Error updating user info:', error);
            alert('회원 정보 수정에 실패했습니다: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div style={{ width: '90%', height: '85px', backgroundColor: '#28527a', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', margin: '0 auto', marginBottom: '20px', borderRadius: '20px' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50px', border: 'none', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                        <FaUser style={{ color: 'white', width: '30px', height: '30px' }} />
                    </div>
                </div>
                <div onClick={openModal} style={{ width: '70%', height: '60%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <h3 style={{ marginTop: '0.3rem', color: 'white' }}>회원정보 수정</h3>
                    <p style={{ fontSize: '12px', marginTop: '0.5rem', color: 'white' }}>회원정보 수정이 필요하시면 수정해주세요~</p>
                </div>
                {isModalOpen && (
                    <div style={{
                        width: '100%', height: '100%', position: 'fixed', top: '0', left: '0', display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)',
                    }}>
                        <div style={{ width: '30%', height: '100%', position: 'fixed', right: '0', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: '30px', borderTopLeftRadius: '30px' }}>
                            <div style={{ width: '90%', height: '90%' }}>
                                <div style={{ width: '100%', height: '5%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                    <IoCloseSharp style={{ width: '30px', height: '30px' }} onClick={closeModal} />
                                </div>
                                <div style={{
                                    width: '100%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center',
                                }}>
                                    <div style={{ marginTop: '3rem', width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h3>
                                            {currentUser.user_name}님 회원 정보 수정
                                        </h3>
                                        <label htmlFor="address" style={{
                                            fontSize: '25px',
                                            color: 'gray',
                                            display: 'flex',
                                            paddingBottom: '10px',
                                            textAlign: 'left',
                                            marginTop: '3rem'
                                        }}>주소</label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="변경하실 주소를 입력하세요"
                                            required
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                marginBottom: '2rem',
                                                border: 0,
                                                backgroundColor: '#f2f3f4',
                                                borderRadius: '10px',
                                                paddingLeft: '10px'
                                            }}
                                        />
                                        <label htmlFor="phone" style={{
                                            fontSize: '25px',
                                            color: 'gray',
                                            display: 'flex',
                                            paddingBottom: '10px',
                                            textAlign: 'left'
                                        }}>전화번호</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="변경하실 전화번호를 입력하세요"
                                            required
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                marginBottom: '2rem',
                                                border: 0,
                                                backgroundColor: '#f2f3f4',
                                                borderRadius: '10px',
                                                paddingLeft: '10px'
                                            }}
                                        />
                                        <button onClick={handleSubmit} style={{ width: '100%', height: '40px', marginTop: '3rem', padding: '10px', backgroundColor: '#28527a', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold' }}>
                                            수정
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserButton;
