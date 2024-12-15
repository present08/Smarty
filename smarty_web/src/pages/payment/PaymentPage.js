import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainNav from "../../component/MainNav";
import Wrapper from "../../component/Wrapper";
import Footer from "../../component/Footer";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 결제 데이터 가져오기
    const { paymentId, items, totalAmount } = location.state || {
        items: [],
        totalAmount: 0,
    };
    console.log(paymentId, items)
    console.log(location.state)

    const handleGoHome = () => {
        navigate("/product");
    };

    return (
        <div className="payment-page-container" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            {/* 상단 네비게이션과 Wrapper */}
            <MainNav />
            <Wrapper />

            {/* 메인 콘텐츠 */}
            <div style={styles.mainContent}>
                <div style={styles.successBox}>
                    <h1 style={styles.title}>🎉 결제가 성공적으로 완료되었습니다! 🎉</h1>
                    <p style={styles.paymentAmount}>
                        총 금액: <strong>{totalAmount.toLocaleString()} 원</strong>
                    </p>

                    <h2 style={styles.subTitle}>결제한 물품</h2>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>상품 이름</th>
                                <th style={styles.tableHeader}>수량</th>
                                <th style={styles.tableHeader}>가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td style={styles.tableCell}>{item.product_name}</td>
                                    <td style={styles.tableCell}>{item.count} 개</td>
                                    <td style={styles.tableCell}>
                                        {(item.price * item.count).toLocaleString()} 원
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button onClick={handleGoHome} style={styles.button}>
                        홈으로 가기
                    </button>
                </div>
            </div>

            {/* 하단 푸터 */}
            <Footer />
        </div>
    );
};

const styles = {
    mainContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
    },
    successBox: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        textAlign: "center",
        maxWidth: "700px",
        width: "100%",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: "20px",
    },
    paymentInfo: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "10px",
    },
    paymentAmount: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#e74c3c",
        marginBottom: "20px",
    },
    subTitle: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        color: "#34495e",
        marginBottom: "15px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
    },
    tableHeader: {
        backgroundColor: "#3498db",
        color: "white",
        padding: "12px",
        border: "1px solid #ddd",
    },
    tableCell: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
        color: "#555",
    },
    button: {
        backgroundColor: "#27ae60",
        color: "white",
        padding: "12px 20px",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#219150",
    },
};

export default PaymentPage;
