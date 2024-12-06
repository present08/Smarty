import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createRental } from '../../api/rentalAPI'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import Footer from '../../component/Footer'
import RentalInfo from '../../component/product/RentalInfo'
import { createPayment } from '../../api/paymentAPI'
import cartApi from "../../api/cartApi"; // API 파일 import
import PaymentModal from '../../component/payment/PaymentModal'
import '../../css/rentalPage.css';

const RentalPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [isPaymentModal, setIsPaymentModal] = useState(false)
    const [rentalId, setRentalId] = useState("")

    const user_id = JSON.parse(localStorage.getItem('user')).user_id;

    const {
        selectProduct,
        quantity,
        price,
    } = location.state || {}

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
        setIsLoggedIn(loggedIn)

        if (!loggedIn) {
            alert('로그인이 필요합니다')
            navigate('/user/login')
        }
    }, [navigate])

    const handleRentalSubmit = async () => {
        // 결제 모달 오픈
        setIsPaymentModal(true)
    }

    const handlePaymentComplete = (postData) => {
        setIsPaymentModal(false)
        console.log("여기는 잘 들어오나 rentalPage ",postData)
        if (postData) {
            createPayment(postData).then(e => alert("결제가완료되었습니다.\n", "결제번호 : ", e))
        } else {
            setError('결제가 실패했습니다. 다시 시도해주세요.');
        }
    };

    if (loading) return <div>처리 중...</div>;

    return (
        <div className="rental-container"> {/* Flexbox가 적용된 최상위 컨테이너 */}
            <MainNav />
            <Wrapper />
            <div> {/* 메인 컨텐츠 */}
                <h2>대여 신청</h2>
                {error && <div className="error-message">{error}</div>}
                <RentalInfo
                    product={selectProduct}
                    quantity={quantity}
                    price={price}
                />
                <div className="rental-submit">
                    <button
                        onClick={handleRentalSubmit}
                        disabled={loading || !isLoggedIn}
                        className="rental-button"
                    >
                        대여 신청하기
                    </button>
                </div>
            </div>
            <Footer /> {/* Footer가 항상 아래에 고정 */}
            <PaymentModal
                isOpen={isPaymentModal}
                onRequestClose={() => setIsPaymentModal(false)}
                onPaymentComplete={handlePaymentComplete}
                amount={price}
                rentalInfo={{
                    product_id: selectProduct.product_id,
                    product_name: selectProduct.product_name,
                    count: quantity || 1
                }}
                user_id={user_id}
            />
        </div>
    )
}


export default RentalPage