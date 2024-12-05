import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { getReservationInfo } from '../../api/userApi';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { deleteReservation } from '../../api/reservaionApi';
import "../../css/cancellButton.css"


const CancellationButton = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schedules, setSchedules] = useState([]);
    useEffect(() => {
        if (props.user) {
            setCurrentUser(props.user);
            getReservationInfo(props.user.user_id).then(e => {
                console.log("console이다아: ", e)
                setSchedules(e);
            });
        }
    }, [props]);

    const deleteReservations = (reservation_id) => {
        deleteReservation(reservation_id, currentUser.user_id).then(e => setSchedules(e))
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ width: '90%', height: '85px', backgroundColor: '#3283a8', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', margin: '0 auto', marginBottom: '20px', borderRadius: '20px' }}>
            <div style={{ width: '100%', height: '100%', }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50px', border: 'none', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                            <FaUser style={{ color: 'white ', width: '30px', height: '30px', }} />
                        </div>
                    </div>
                    <div onClick={openModal} style={{ width: '70%', height: '60%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <div></div>
                        <h3 style={{ marginTop: '0.3rem', color: 'white' }}>예약 취소</h3>
                        <p style={{ fontSize: '12px', marginTop: '0.5rem', color: 'white' }}>예약 취소는 신중하게 생각해 주세요</p>
                    </div>
                    {isModalOpen && (
                        <div style={{
                            width: '100%', height: '100%', position: 'fixed', top: '0', left: '0', display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: '999'
                        }}>
                            <div style={{ width: '50%', height: '100%', position: 'fixed', right: '0', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <div style={{ width: '90%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '100%', height: '5%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                        <IoCloseSharp style={{ width: '30px', height: '30px' }} onClick={closeModal} />
                                    </div>
                                    <div style={{ marginTop: '2rem', width: '90%', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <h3 style={{
                                            fontSize: '28px',
                                        }}>
                                            {currentUser.user_name} 님 <span style={{ color: '#f4d160' }}>일일입장</span> 예약 현황
                                        </h3>
                                        <p style={{ color: 'gray', fontSize: '20px' }}>예약취소는 신중하게 부탁드립니다.</p>
                                        <ul style={{ overflowY: 'scroll', height: '90%', marginTop: '2rem' }}>
                                            {schedules.map((item, idx) => (
                                                <li className='cancellBtnTap' key={idx}>
                                                    <div>
                                                        <div>
                                                            <h4>{item.court_name}</h4>
                                                        </div>
                                                        <div>
                                                            <h3>{item.facility_name}</h3>
                                                        </div>
                                                        <div>
                                                            <AiOutlineClockCircle style={{ marginRight: '5px' }} />
                                                            <p style={{ marginRight: '5px' }}>{item.reservation_start.split('T')[0]} {item.reservation_start.split('T')[1].substring(0, 2)}시 ~ {item.reservation_end.split('T')[0]} {item.reservation_end.split('T')[1].substring(0, 2)}시</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => deleteReservations(item.reservation_id)}>
                                                        <div >예약 취소하기</div>
                                                    </div>
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CancellationButton;