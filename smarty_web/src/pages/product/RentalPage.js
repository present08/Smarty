import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createRental } from '../../api/rentalAPI'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import Footer from '../../component/Footer'
import RentalInfo from '../../component/product/RentalInfo'

const RentalPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState();

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
        console.log(location.state)
        console.log(selectProduct)
        console.log(user_id)
        console.log("로그인정보", isLoggedIn)
    })

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
        setIsLoggedIn(loggedIn)

        if (!loggedIn) {
            alert('로그인이 필요합니다')
            navigate('/user/login')
        }
    }, [navigate])

    const handleRentalSubmit = async () => {
        if (!isLoggedIn || !user_id || !selectProduct) {
            alert('로그인이 필요하거나 필요한 정보가 누락되었습니다.');
            return;
        }

        setLoading(true);
        try {
            // 날짜 형식 수정
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            };

            const today = new Date();
            const returnDate = new Date(today);
            returnDate.setDate(today.getDate() + 3);

            const rentalData = {
                user_id: user_id,
                product_id: selectProduct.product_id,
                facility_id: selectProduct.facility_id,
                rental_date: formatDate(today),         // 형식 변경된 날짜
                return_date: formatDate(returnDate),    // 형식 변경된 날짜
                quantity: quantity || 1,
                price: selectProduct.price || price
            };

            console.log('서버로 전송할 데이터:', rentalData);

            const result = await createRental(rentalData);
            console.log('서버 응답:', result);

            alert('대여가 완료되었습니다.');
            navigate('/product');

        } catch (error) {
            console.error('상세 에러:', error);
            setError('렌탈 신청에 실패했습니다.');
            alert(error.response?.data || '렌탈 신청에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('현재 데이터:', {
            selectProduct,
            quantity,
            price,
            user_id
        });
    }, []);

    if (loading) return <div>처리 중...</div>;

    return (
        <div>
            <MainNav />
            <Wrapper />
            <div className="rental-container">
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
            <Footer />
        </div>
    )
}

export default RentalPage