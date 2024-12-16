import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { getUserMemberGrade } from '../../api/membershipApi'
import { enrollpayment } from '../../api/paymentAPI'

const ClassEventModal = ({ classEvent, currentUser, closeModal }) => {
    const init = {
        enrollment_id: classEvent.enrollment_id, amount: classEvent.price
    }

    const [enrollData, setEnrollData] = useState(init);

    useEffect(() => {
        let price = classEvent.price;
        getUserMemberGrade(currentUser.user_id).then(e => {
            switch (e[0].membership_level) {
                case "브론즈": price = (classEvent.price); break;
                case "실버": price = (Math.floor((classEvent.price - (classEvent.price * 0.03)) / 10) * 10); break;
                case "골드": price = (Math.floor((classEvent.price - (classEvent.price * 0.05)) / 10) * 10); break;
                case "플래티넘": price = (Math.floor((classEvent.price - (classEvent.price * 0.07)) / 10) * 10); break;
                case "다이아": price = (Math.floor((classEvent.price - (classEvent.price * 0.1)) / 10) * 10); break;
            }
            setEnrollData({ enrollment_id: classEvent.enrollment_id, amount: price })
        })
    }, [])

    //enrollment payment system
    const enrollmentPayment = () => {
        //iamport Payment System
        const { IMP } = window
        IMP.init("imp57034437");

        const data = {
            pg: 'html5_inicis',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            amount: enrollData.amount,                                 // 결제금액
            name: classEvent.class_name,                  // 주문명
            buyer_name: currentUser.user_id,                           // 구매자 이름
        };

        IMP.request_pay(data, insertEnrollment)
    }

    const insertEnrollment = (success) => {
        if (success.success) {
            enrollpayment(enrollData).then(e => {
                closeModal()
                window.location.reload();
            })
        }
    }

    return (
        <div
            style={{
                width: '23%', height: '70%', backgroundColor: 'white', position: 'absolute', top: '20%', zIndex: '999', right: '9%', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
        >
            <div onClick={closeModal} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }} >
                <div style={{ width: '80%', height: '25%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '33px', marginRight: '10px', margin: 0 }}>SMARTY</p>
                        <p style={{ fontSize: '33px', marginRight: '10px', margin: 0, display: 'flex', marginBottom: '0.5rem' }}>
                            수강신청
                            <AiFillCheckCircle style={{ width: '25px', height: '25px', marginLeft: '5px' }} />
                        </p>
                        <p style={{ fontSize: '19px', color: 'grey' }}>{moment().format('YYYY-MM-DD HH:mm')}</p>
                    </div>
                </div>
                <hr style={{ border: '1px solid gray', marginBottom: '2rem', width: '80%', }} />
                <div style={{ width: '80%', height: '10%', textAlign: 'left' }}>
                    <p style={{ fontSize: '23px' }}>{currentUser?.user_name}님</p>
                </div>
                <hr style={{ border: '1px solid gray', marginBottom: '2rem', width: '80%', }} />
                <div style={{ width: '80%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '21px', color: 'gray' }}>강의 시설명</p>
                    <p style={{ fontSize: '21px' }}>{classEvent.class_name}</p>
                </div>
                <div style={{ width: '80%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '21px', color: 'gray' }}>강의 시작</p>
                    <p style={{ fontSize: '21px' }}>{moment(classEvent.start_date).format('YYYY-MM-DD')} {classEvent.start_time.substring(0, 5)}</p>
                </div>
                <div style={{ width: '80%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '21px', color: 'gray' }}>강의 종료</p>
                    <p style={{ fontSize: '21px' }}>{moment(classEvent.end_date).format('YYYY-MM-DD')} {classEvent.end_time.substring(0, 5)}</p>
                </div>
                <hr style={{ border: '1px solid gray', marginBottom: '2rem', width: '80%', }} />
            </div>
            <div style={{ width: '100%', height: '12%', textAlign: 'left', marginTop: '2rem', backgroundColor: '#f2f2f2', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <p>현재 상태는 <strong style={classEvent.enrollment_status == "결제대기" ? { color: 'red' } : classEvent.enrollment_status == "승인대기" ? { color: '#f4d160' } : { color: "blue" }}>{classEvent.enrollment_status}</strong> 상태입니다.</p>
                {classEvent.enrollment_status == '결제대기' ?
                    <button onClick={enrollmentPayment} style={{ width: '100px', height: '40px', backgroundColor: '#003f66', border: 'none', borderRadius: '7px', color: 'white', marginRight: '15px' }}>
                        결제하기
                    </button>
                    : <></>}
            </div>
        </div >
    )
}

export default ClassEventModal