import React, { useState } from 'react';
import { LuCalendarCheck } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { enrollpayment } from '../../api/paymentAPI';
import '../../css/reservationComplete.css';

const UserEnrollmentPage = () => {
    const location = useLocation();

    const { classData, Dprice, user, e } = location.state
    const init = {
        enrollment_id: e, amount: classData.price, user_id: user.user_id
    }
    const [enrollData, setEnrollData] = useState(init)
    const [paybtn, setPaybtn] = useState(false)
    const navigate = useNavigate()

    const closed = (page) => {
        if (page == "mypage") {
            navigate('/mypage', { state: { user } })
        } else if (page == 'home') {
            navigate('/')
        } else if (page == 'payment') {
            enrollmentPayment();
        }
    }
    const enrollmentPayment = () => {
        //iamport Payment System
        const { IMP } = window
        IMP.init("imp57034437");

        const data = {
            pg: 'html5_inicis',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            amount: Dprice,                                 // 결제금액
            name: classData.class_name,                  // 주문명
            buyer_name: user.user_id,                           // 구매자 이름
        };

        IMP.request_pay(data, insertEnrollment)
    }

    const insertEnrollment = (success) => {
        if (success.success) {
            setPaybtn(true)
            enrollpayment(enrollData)
        }
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
                    <h3 style={{ marginTop: '100px', fontSize: '21px' }}>{user.user_name} 님께서 접수하신 <span style={{ color: '#50c4d2' }}>{classData.class_name}</span> 수강신청이 완료 되었습니다!</h3>
                    <h1 style={{ fontSize: '40px', marginTop: '30px', marginBottom: '30px' }}>{classData.start_date} {classData.start_time} - {classData.end_date} {classData.end_time}</h1>
                    <h3 style={{ fontSize: '21px' }}>이용금액 {Dprice}원 입니다.</h3>
                    <h3 style={{ fontSize: '21px', marginTop: '10px' }}>수강 현황은 <span style={{ color: '#50c4d2' }}>마이페이지</span>에서 확인 가능합니다.</h3>
                    <h3 style={{ fontSize: '20px', marginTop: '10px' }}>이용해주셔서 감사합니다.</h3>
                </div>
                <div className='reservationInformationCheck' style={{
                    width: '50%', display: 'flex', justifyContent: 'space-around'
                }}>
                    <button onClick={() => closed("payment")} disabled={paybtn}>결제하기</button>
                    <button onClick={() => closed("mypage")}>마이페이지로 이동</button>
                    <button onClick={() => closed("home")}>닫기</button>
                </div>
            </div>
        </div>
    )
}

export default UserEnrollmentPage