// EventModal.js
import React from 'react';
import moment from 'moment/moment';
import { AiFillCheckCircle } from 'react-icons/ai';

const EventModal = ({ reservation, currentUser, closeModal }) => {

    return (
        <div
            style={{
                width: '23%',
                height: '70%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '20%',
                zIndex: '999',
                right: '9%',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={closeModal}
        >
            <div style={{ width: '80%', height: '80%' }} >
                {/* 예약 상세 내용 */}
                <div style={{ width: '100%', height: '25%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '33px', marginRight: '10px', margin: 0 }}>SMARTY</p>
                        <p style={{ fontSize: '33px', marginRight: '10px', margin: 0, display: 'flex', marginBottom: '0.5rem' }}>
                            시설 예약
                            <AiFillCheckCircle style={{ width: '25px', height: '25px', marginLeft: '5px' }} />
                        </p>
                        <p style={{ fontSize: '19px', color: 'grey' }}>{moment().format('YYYY-MM-DD HH:mm')}</p>
                    </div>
                </div>
                <hr style={{ border: '1px solid gray', marginBottom: '2rem' }} />
                <div style={{ width: '100%', height: '10%', textAlign: 'left' }}>
                    <p style={{ fontSize: '23px' }}>{currentUser?.user_name}님</p>
                </div>
                <hr style={{ border: '1px solid gray', marginBottom: '2rem' }} />
                {/* 예약 정보 */}
                <div style={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '21px', color: 'gray' }}>예약 시설명</p>
                    <p style={{ fontSize: '21px' }}>{reservation.facility_name}</p>
                </div>
                <div style={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '21px', color: 'gray' }}>예약 시작</p>
                    <p style={{ fontSize: '21px' }}>{moment(reservation.reservation_start).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div style={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '21px', color: 'gray' }}>예약 종료</p>
                    <p style={{ fontSize: '21px' }}>{moment(reservation.reservation_end).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <hr style={{ border: '1px solid gray', marginTop: '1rem' }} />
                <div style={{ width: '100%', height: '10%', textAlign: 'right', marginTop: '2rem' }}>
                    <button style={{ width: '120px', height: '50px', backgroundColor: '#003f66', border: 'none', borderRadius: '15px', color: 'white' }}>
                        예약취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;