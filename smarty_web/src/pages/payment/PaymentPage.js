import React, { useState } from "react";
import { createPayment, approvePayment, getPaymentById } from "../../api/paymentAPI";

const PaymentPage = () => {
    const [paymentData, setPaymentData] = useState({
        reservation_id: "",
        enrollment_id: "",
        rental_id: "",
        amount: 0,
    });

    const [paymentId, setPaymentId] = useState("");
    const [paymentInfo, setPaymentInfo] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreatePayment = async () => {
        try {
            const response = await createPayment(paymentData);
            alert(response.message);
            setPaymentId(response.data.payment_id);
        } catch (error) {
            alert("결제 생성 실패");
        }
    };

    const handleApprovePayment = async () => {
        try {
            const response = await approvePayment(paymentId);
            alert(response.message);
        } catch (error) {
            alert("결제 승인 실패");
        }
    };

    const handleGetPayment = async () => {
        try {
            const response = await getPaymentById(paymentId);
            setPaymentInfo(response.data);
        } catch (error) {
            alert("결제 조회 실패");
        }
    };

    return (
        <div>
            <h1>결제 페이지</h1>
            <div>
                <h3>결제 정보 입력</h3>
                <input type="text" name="reservation_id" placeholder="예약 ID" onChange={handleInputChange} />
                <input type="text" name="enrollment_id" placeholder="등록 ID" onChange={handleInputChange} />
                <input type="text" name="rental_id" placeholder="대여 ID" onChange={handleInputChange} />
                <input type="number" name="amount" placeholder="금액" onChange={handleInputChange} />
                <button onClick={handleCreatePayment}>결제 생성</button>
            </div>

            {paymentId && (
                <div>
                    <h3>결제 ID: {paymentId}</h3>
                    <button onClick={handleApprovePayment}>결제 승인</button>
                    <button onClick={handleGetPayment}>결제 조회</button>
                </div>
            )}

            {paymentInfo && (
                <div>
                    <h3>결제 정보</h3>
                    <p>결제 ID: {paymentInfo.payment_id}</p>
                    <p>금액: {paymentInfo.amount}</p>
                    <p>결제 날짜: {paymentInfo.payment_date}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
