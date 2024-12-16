
import React, { useEffect, useState } from 'react';
import { LuCalendarCheck } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { reserpayment } from '../../api/paymentAPI';
import '../../css/reservationComplete.css';

const ReservationComplete = (props) => {
    const { postData, facilityData, user, price, closeModal } = props;
    const [btnData, setBtnData] = useState([])
    const navigate = useNavigate()

    const closed = (e) => {
        if (e == "mypage") {
            navigate('/mypage', { state: { user } })
        }
        closeModal(false, btnData)
    }
    useEffect(() => {
        reserpayment(postData).then(e => setBtnData(e.btnData))
    }, [props])


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
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F0F0F3',
                justifyContent: 'space-around'
            }}>
                <div style={{
                    width: '80%',
                    height: '70%',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#28527a', borderRadius: '50px'
                    }}>
                        <LuCalendarCheck style={{ width: '40px', height: '40px', color: 'white' }} />
                    </div>
                    <h3 style={{ marginTop: '100px', fontSize: '21px' }}>{user.user_name} 님께서 접수하신 <span style={{ color: '#50c4d2' }}>{facilityData.facility_name}</span> 예약이 완료 되었습니다!</h3>
                    <h1 style={{ fontSize: '40px', marginTop: '30px', marginBottom: '30px' }}>{postData.reservation_start} - {postData.reservation_end}</h1>
                    <h3 style={{ fontSize: '21px' }}>이용금액 {price}원 입니다.</h3>
                    <h3 style={{ fontSize: '21px', marginTop: '10px' }}>예약 현황은 <span style={{ color: '#50c4d2' }}>마이페이지</span>에서 확인 가능합니다.</h3>
                    <h3 style={{ fontSize: '20px', marginTop: '10px' }}>이용해주셔서 감사합니다.</h3>
                </div>
                <div className='reservationInformationCheck' style={{
                    width: '30%', display: 'flex', justifyContent: 'space-around'
                }}>
                    <button onClick={() => closed("mypage")}>마이페이지로 이동</button>
                    <button onClick={() => closed("close")}>닫기</button>
                </div>
            </div>
        </div>
    )
}

export default ReservationComplete