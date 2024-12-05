import React, { useState } from "react";
import { createPayment, approvePayment, getPaymentById } from "../../api/paymentAPI";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 결제 데이터 가져오기
    const { paymentId, items, totalAmount } = location.state || {
        paymentId: null,
        items: [],
        totalAmount: 0,
    }
console.log(location)
    const handleGoHome = () => {
        navigate("/product");
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>결제가 성공적으로 완료되었습니다!</h1>
            <p>결제 번호: <strong>{paymentId}</strong></p>
            <p>총 금액: <strong>{totalAmount.toLocaleString()} 원</strong></p>

            <h2>결제한 물품</h2>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>상품 이름</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>수량</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.product_name}</td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.count} 개</td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{(item.price * item.count).toLocaleString()} 원</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleGoHome} style={{ marginTop: "20px", padding: "10px 20px" }}>
                홈으로 가기
            </button>
        </div>
    );
};

export default PaymentPage;
