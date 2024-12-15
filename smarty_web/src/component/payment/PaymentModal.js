import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // npm install react-modal
import './PaymentModal.css';
import { getList } from '../../api/rentalAPI';

Modal.setAppElement('#root'); // 모달 접근성을 위한 설정

const init = {
    reservation_id: null,
    enrollment_id: null,
    amount: 0,
    user_id: "",
    product_id: "",
    count: 0,
}

const PaymentModal = ({ isOpen, onRequestClose, onPaymentComplete, amount, rentalInfo, user_id }) => {

    const [reservationList, setReservationList] = useState([]);
    const [enrollmentList, setEnrollmentList] = useState([]);
    const [btnState, setBtnState] = useState(true);
    const [postData, setPostData] = useState(init);

    useEffect(() => {
        getList(user_id).then(e => {
            setReservationList(e.reservationList)
            setEnrollmentList(e.enrollmentList)
        })
    }, [user_id])

    useEffect(() => {
        console.log("PaymentModal에서 전달받은 rentalInfo: ", rentalInfo);
    }, [rentalInfo]);

    const handlePayment = () => {
        console.log("최종 PostData: ", postData);

        if (!postData.product_id || !postData.count) {
            alert("상품 정보가 누락되었습니다. 다시 시도해주세요.");
            return;
        }

        const { IMP } = window; // 아임포트 초기화
        IMP.init('imp43324543');

        const data = {
            pg: 'html5_inicis',
            pay_method: 'card',
            name: rentalInfo[0]?.product_name || "상품명",
            amount: postData.amount,
            buyer_name: postData.user_id,
            merchant_uid: `order_${new Date().getTime()}`,
        };

        IMP.request_pay(data, (response) => {
            if (response.success) {
                console.log("결제 성공: ", response);
                onPaymentComplete(postData);
            } else {
                console.error("결제 실패: ", response);
                onPaymentComplete(false);
            }
        });
    };

    useEffect(() => {
        console.log("PostData 변경 감지: ", postData)

        if (postData.amount > 0) {
            setBtnState(false)
        } else {
            setBtnState(true)
        }
    }, [postData])

    const enableBtn = (item) => {
        const selectedProduct = rentalInfo.find(
            (product) => product.product_id === item.product_id || product.product_id === rentalInfo[0]?.product_id
        );

        if (item.reservation_id && postData.reservation_id !== item.reservation_id) {
            setPostData({
                reservation_id: item.reservation_id,
                enrollment_id: null,
                amount: amount,
                user_id: user_id,
                product_id: selectedProduct?.product_id || "",
                count: selectedProduct?.count || 1,
            });
        } else if (item.enrollment_id && postData.enrollment_id !== item.enrollment_id) {
            setPostData({
                reservation_id: null,
                enrollment_id: item.enrollment_id,
                amount: amount,
                user_id: user_id,
                product_id: selectedProduct?.product_id || "",
                count: selectedProduct?.count || 1,
            });
        } else {
            setPostData(init);
        }
    };

    useEffect(() => {
        if (postData.amount > 0) {
            setBtnState(false)
        } else {
            setBtnState(true)
        }
    }, [postData])


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
                <button onClick={handlePayment} disabled={btnState}>결제하기</button>
                <button onClick={onRequestClose}>취소</button>
            </div>
            <div className='contentBox'>
                <ul className='listBox'>
                    {reservationList.map((item, idx) => (
                        <li className={postData.reservation_id === item.reservation_id ? 'active' : ''} onClick={() => enableBtn(item, idx)} key={idx}>예약 일정 : {item.reservation_start.split(" ")[0]} ~ {item.reservation_end.split(" ")[0]}</li>
                    ))}
                </ul>
                <ul className='listBox'>
                    {enrollmentList.map((item, idx) => (
                        <li className={postData.enrollment_id === item.enrollment_id ? 'active' : ''} onClick={() => enableBtn(item, idx)} key={idx}>수업 : {item.class_name} : {item.start_date} ~ {item.end_date}</li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default PaymentModal;
