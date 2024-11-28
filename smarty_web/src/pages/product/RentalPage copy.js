import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createRental } from '../../api/rentalAPI'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import Footer from '../../component/Footer'
import RentalInfo from '../../component/product/RentalInfo'
import { createPayment } from '../../api/paymentAPI'
import PaymentModal from '../../component/payment/PaymentModal'
import '../../css/rentalPage.css';

const RentalPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [isPaymentModal, setIsPaymentModal] = useState(false)

    // 로그인 정보 가져오기
    const userStr = localStorage.getItem('user');
    let user_id;
    try {
        const userInfo = JSON.parse(userStr || '{}');
        user_id = userInfo.user_id;
    } catch (error) {
        console.error('사용자 정보 파싱 에러:', error);
    }

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

    const handleRentalSubmit = () => {
        setIsPaymentModal(true)
    }

    const handlePaymentComplete = async (isSuccess) => {
        setIsPaymentModal(false)

        if (isSuccess) {
            setLoading(true);
            try {
                //결제 데이터 생성
                const today = new Date();
                const returnDate = new Date(today);
                returnDate.setDate(today.getDate() + 1);

                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                };

                const paymentData = {
                    reservation_id: null,
                    enrollment_id: null,
                    rental_id: selectProduct.product_id,
                    amount: selectProduct.price || price,
                };

                console.log('결제 데이터: ', paymentData);

                const paymentResult = await createPayment(paymentData); // 결제 API 호출
                console.log('결제 결과: ', paymentResult);

                if (!paymentResult || !paymentResult.payment_id) {
                    throw new Error('결제 생성에 실패했습니다.');
                }

                // Step 2: 대여 데이터 생성
                const rentalData = {
                    user_id: user_id,
                    product_id: selectProduct.product_id,
                    facility_id: selectProduct.facility_id,
                    rental_date: formatDate(today),
                    return_date: formatDate(returnDate),
                    count: quantity || 1,
                    price: selectProduct.price || price,
                };

                console.log('대여 데이터:', rentalData);

                const rentalResult = await createRental(rentalData);
                console.log('대여 결과:', rentalResult);

                alert('결제와 대여가 완료되었습니다.');
                navigate('/rental/list'); // 대여 완료 후 이동
            } catch (error) {
                console.error('결제 또는 대여 처리 중 에러:', error);
                setError('대여 신청에 실패했습니다.');
            } finally {
                setLoading(false);
            }
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
                amount={selectProduct.price || price}
                rentalInfo={{
                    product_name: selectProduct.product_name,
                    count: quantity || 1
                }}
            />
        </div>
    )
}

export default RentalPage