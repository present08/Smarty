import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { modify_info } from '../../api/userApi';

const host = 'http://localhost:8080';

const UserButton = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');

    useEffect(() => {
        setCurrentUser(props.user);
    }, [props]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        const userInfo = { user_id: currentUser.user_id, address: newAddress, phone: newPhone }; // user_id로 변경

        console.log("전송할 사용자 정보:", userInfo); // 디버깅을 위한 로그

        try {
            modify_info(userInfo).then(e => {
                alert('변경 완료되었습니다. 재로그인해주세요!');
            })
            closeModal();
        } catch (error) {
            console.error('Error updating user info:', error);
            alert('회원 정보 수정에 실패했습니다: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div style={{ width: '90%', height: '85px', backgroundColor: '#28527a', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)', margin: '0 auto', marginBottom: '20px', borderRadius: '20px' }}>
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
                        width: '100%', height: '100%', position: 'fixed', top: '0', left: '0', display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: '999'
                    }}>
                        <div style={{ width: '30%', height: '100%', position: 'fixed', right: '0', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '100' }}>
                            <div style={{ width: '90%', height: '90%' }}>
                                <div style={{ width: '100%', height: '5%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                    <IoCloseSharp style={{ width: '30px', height: '30px' }} onClick={closeModal} />
                                </div>
                                <div style={{
                                    width: '100%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center',
                                }}>
                                    <div style={{ marginTop: '3rem', width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h3 style={{ fontSize: '26px', marginBottom: '1rem' }}>
                                            {currentUser.user_name}님 회원 정보 수정
                                        </h3>
                                        <p style={{ color: 'gray' }}>수정 후 재로그인이 필요합니다.</p>
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
                                            // value={currentUser.address}
                                            onChange={(e) => setNewAddress(e.target.value)}
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
                                            // value={currentUserphone}
                                            onChange={(e) => setNewPhone(e.target.value)}
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
