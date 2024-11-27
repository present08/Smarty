import { rgbToHex } from '@mui/material';
import React, { useState } from 'react'
import '../../css/reservationComplete.css'
import { useNavigate } from 'react-router-dom';

const ReservationComplete = (props) => {
    const { postData, facilityData, user, price, closeModal } = props;
    const navigate = useNavigate()

    const closed = (e) => {
        if (e == "mypage") {
            navigate('/mypage', { state: { user } })
        }
        closeModal(false)
    }

    return (
        <div>
            <div style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: '9999',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',

            }}>
                <div style={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: 'white',
                    borderRadius: '15px'
                }}>
                    <div>
                        <h1 style={{ marginTop: '100px', fontSize: '55px' }}>{user.user_name} 님께서 접수하신 {facilityData.facility_name} 예약이 완료 되었습니다!</h1>
                        <p>접수 일자 : {postData.reservation_start} - {postData.reservation_end}</p>
                        <p>예약 현황은 마이페이지에서 확인 가능합니다.</p>
                        <p>이용금액 : {price}</p>
                        {/* <div className='completeInfo'>
                            <div className='completeInfoText'>
                                <div className='completeInfo_list'>
                                    <div className='completeSubtitle'>예약 시설</div>
                                    <div className='completeContent'>내용</div>
                                </div>
                                <hr style={{ color: 'gainsboro', width: '80%', marginTop: '1rem' }} />
                                <div className='complete_hottime'>
                                    <p>주의사항 꼭 읽어주세요</p>
                                </div> 
                            </div>
                        </div>*/}
                        <button style={{
                            width: '80px',
                            height: '30px',
                            backgroundColor: 'red',
                            color: 'white'
                        }} onClick={() => closed("mypage")}>마이페이지로 이동</button>
                        <button style={{
                            width: '80px',
                            height: '30px',
                            backgroundColor: 'red',
                            color: 'white'
                        }} onClick={() => closed("close")}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationComplete