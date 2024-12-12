import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getProductRentalUser } from '../../api/rentalAPI';
import '../../css/rentalList.css';

const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getUserRentals = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/user/login');
                return;
            }

            const user = JSON.parse(userStr);
            const rentals = await getProductRentalUser(user.user_id);
            setRentals(rentals);
        } catch (error) {
            console.error('대여 목록 조회 실패:', error);
            alert('대여 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserRentals();
    }, []);

    if (loading) {
        return <div className="rentalList-container">로딩 중...</div>;
    }

    return (
        <div className="rentalList-container">
            <h1 className="rentalList-title">내 대여 목록</h1>
            <button
                className="rentalList-return-button"
                onClick={() => navigate(-1)}
            >
                이전
            </button>

            {rentals.length === 0 ? (
                <div className="rentalList-container">대여한 물품이 없습니다.</div>
            ) : (
                <table className="rentalList-table">
                    <thead>
                        <tr>
                            <th>이미지</th>
                            <th>물품명</th>
                            <th>사이즈</th>
                            <th>대여일</th>
                            <th>반납 예정일</th>
                            <th>수량</th>
                            <th>상태</th>
                            <th>반납</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map((rental) => (
                            <tr key={rental.rental_id}>
                                <td>
                                    <div className="rentalList-image-container">
                                        <img
                                            src={rental.image || '/path/to/default-image.jpg'} // 이미지가 없을 경우 기본 이미지 사용
                                            alt={rental.product_name}
                                            className="rentalList-image"
                                        />
                                    </div>
                                </td>
                                <td>{rental.product_name}</td>
                                <td>{rental.size}</td>
                                <td>{new Date(rental.rental_date).toLocaleString()}</td>
                                <td>{new Date(rental.return_date).toLocaleString()}</td>
                                <td>{rental.count}</td>
                                <td>{rental.rental_status ? '대여 중' : '반납 완료'}</td>
                                <td>
                                    {rental.rental_status && (
                                        <button
                                            className="rentalList-return-button"
                                            onClick={() => alert(`반납 처리: ${rental.rental_id}`)}
                                        >
                                            반납하기
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RentalList;
