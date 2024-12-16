import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductRentalUser } from '../../api/rentalAPI';
import '../../css/rentalList.css';
import axiosInstance from '../../api/axiosInstance';
import { getProductFiles } from '../../api/productApi';

const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rentalImages, setRentalImages] = useState({});
    const navigate = useNavigate();

console.log("rentals 의 데이터 확인",rentals)

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

            // 대여한 상품의 이미지를 불러오는 로직 추가
            const filesMap = {};
            await Promise.all(
                rentals.map(async (rental) => {
                    const files = await getProductFiles(rental.product_id).catch(() => []);
                    filesMap[rental.product_id] = files.length > 0
                        ? files.map((file) => `http://localhost:8080/api/user/products/images/${file}`)
                        : ['/no-image.png'];
                })
            );
            setRentalImages(filesMap);
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

    const handleReturn = async (rental_id, count) => {
        try {
            const response = await axiosInstance.put(`/user/rentals/${rental_id}/return`, null, {
                params: { count },
            });
            if (response.status === 200) {
                alert('반납 완료');
                setRentals((prev) =>
                    prev.map((rental) =>
                        rental.rental_id === rental_id
                            ? { ...rental, rental_status: false, return_date: response.data.return_date }
                            : rental
                    )
                );
            }
        } catch (error) {
            console.error('반납 처리 중 오류:', error);
            alert('반납 처리에 실패했습니다.');
        }
    };

    return (
        <div className="rentalList-container">
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
                            {rentals.map((rental) => {
                                const rentalDate = new Date(rental.rental_date);
                                const returnDate = new Date(rentalDate);
                                returnDate.setDate(rentalDate.getDate() + 1);

                                return (
                                    <tr key={rental.rental_id}>
                                        <td>
                                            <div className="rentalList-image-container">
                                                <img
                                                    src={
                                                        rentalImages[rental.product_id]?.[0] ||
                                                        '/path/to/default-image.jpg'
                                                    }
                                                    alt={rental.product_name}
                                                    className="rentalList-image"
                                                    onError={(e) => {
                                                        e.target.src = '/no-image.png';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>{rental.product_name}</td>
                                        <td>{rental.size }</td>
                                        <td>{new Date(rental.rental_date).toLocaleString()}</td>
                                        <td>
                                            {rental.return_date
                                                ? new Date(rental.return_date).toLocaleString()
                                                : returnDate.toLocaleString()}
                                        </td>
                                        <td>{rental.count}</td>
                                        <td>{rental.rental_status ? '대여 중' : '반납 완료'}</td>
                                        <td>
                                            {rental.rental_status && (
                                                <button
                                                    className="rentalList-return-button"
                                                    onClick={() => handleReturn(rental.rental_id, rental.count)}
                                                >
                                                    반납하기
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                </table>
            )}
        </div>
    );
};

export default RentalList;
