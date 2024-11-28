import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // npm install react-modal
import './PaymentModal.css';
import { getList } from '../../api/rentalAPI';

Modal.setAppElement('#root'); // 모달 접근성을 위한 설정

const PaymentModal = ({ isOpen, onRequestClose, onPaymentComplete, amount, rentalInfo,user_id }) => {

    const [reservationList, setReservationList] = useState([]);

    console.log("계산 가격: ", rentalInfo.count * amount)
    console.log("토탈 가격: ", amount)

    useEffect(() => {
        getList(user_id).then(e => setReservationList(e))
    }, [])
    

    const handlePayment = () => {
        const { IMP } = window //아임포트 초기화
        IMP.init('imp43324543')

        const data = {
            pg: 'kakaopay',
            pay_method: 'card',
            name: rentalInfo.product_name,
            amount: amount,
            merchant_uid: `order_${new Date().getTime()}`,

        }

        IMP.request_pay(data, (response) => {
            if (response.success) {
                console.log('결제 성공: ', response)
                onPaymentComplete(true)
            } else {
                console.log('결제 실패', response)
                onPaymentComplete(false)
            }
        })
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="payment-modal-overlay"
            className="payment-modal">
            <div>
                <h2>결제 진행</h2>
                <p>상품명: {rentalInfo.product_name}</p>
                <p>수량: {rentalInfo.count}</p>
                <p>결제 금액: {amount?.toLocaleString()}원</p>
            </div>
            <div>
                <button onClick={handlePayment}>결제하기</button>
                <button onClick={onRequestClose}>취소</button>
            </div>
            <ul className='reservationList'>
                {reservationList.map((item,idx) => (
                    <li key={idx}>{item.reservation_start.split(" ")[0]}</li>
                ))}
            </ul>
        </Modal>
    );
};

export default PaymentModal;
