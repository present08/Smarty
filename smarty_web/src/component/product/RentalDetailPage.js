import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RentalDetailPage = () => {
    const { rental_id } = useParams();
    const navigate = useNavigate();
    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [completedRental, setCompletedRental] = useState(false);
    const [productImages, setProductImages] = useState([])

    
    const fetchProductImages = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${productId}/images`);
            console.log('이미지 데이터:', response.data);  // 이미지 데이터 확인
            if (response.data) {
                setProductImages(response.data);
            }
        } catch (error) {
            console.error('이미지 로딩 실패:', error);
        }
    };

    useEffect(() => {
        const fetchRentalDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/rentals/${rental_id}`);
                // rental_id가 이미 문자열이므로 parseInt 제거
                
                if (response.data) {
                    setRental(response.data);
                    if (response.data.product_id) {
                        await fetchProductImages(response.data.product_id);
                    }
                    // 반납일이 지났는지 확인
                    if (response.data.return_date && new Date(response.data.return_date) <= new Date()) {
                        setCompletedRental(true);
                    }
                } else {
                    setError('대여 정보가 없습니다.');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('대여 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (rental_id) {
            fetchRentalDetail();
        }
    }, [rental_id]);

    const handleReturn = async () => {
        if (!window.confirm('정말 반납하시겠습니까?')) {
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/rentals/${rental_id}/return`);
            if (response.status === 200) {
                alert("반납이 완료되었습니다.");
                setCompletedRental(true);
            }
        } catch (error) {
            console.error("반납 처리 실패:", error);
            alert("반납 처리 중 오류가 발생했습니다.");
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-xl">로딩중...</div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center p-4">{error}</div>
    );

    if (!rental) return (
        <div className="text-center p-4">대여 정보를 찾을 수 없습니다.</div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-6">대여 상세 정보</h1>
                {productImages.map((image, index) => {
                    const imageUrl = `http://localhost:8080/api/products/images/${image.uuid}_${image.fileName}`;
                    console.log('이미지 정보:', image);  // 이미지 데이터 구조 확인
                    console.log('생성된 URL:', imageUrl);  // URL 확인
                    return (
                        <div key={index} className="relative aspect-w-16 aspect-h-9">
                            <img
                                src={imageUrl}
                                alt={`Product image ${index + 1}`}
                                className="object-cover rounded-lg shadow-md w-full h-full"
                                onError={(e) => {
                                    console.log('이미지 로드 실패:', e.target.src);
                                }}
                            />
                        </div>
                    );
                })}

                <div className="space-y-4"></div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="font-semibold">대여 ID</div>
                        <div>{rental.rental_id}</div>

                        <div className="font-semibold">사용자 ID</div>
                        <div>{rental.user_id}</div>

                        <div className="font-semibold">물품명</div>
                        <div>{rental.product_name}</div>

                        <div className="font-semibold">대여일</div>
                        <div>{formatDateTime(rental.rental_date)}</div>

                        <div className="font-semibold">반납예정일</div>
                        <div>{formatDateTime(rental.return_date)}</div>

                        <div className="font-semibold">상태</div>
                        <div className={completedRental ? "text-green-600" : "text-blue-600"}>
                            {completedRental ? "반납 완료" : "대여 중"}
                        </div>
                    </div>
                </div>

                {/* 버튼 그룹 */}
                <div className="mt-8 flex gap-4 justify-end">
                    <button
                        onClick={() => navigate('/rental/list')}
                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                    >
                        목록으로
                    </button>
                    {!completedRental && (
                        <button
                            onClick={handleReturn}
                            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                        >
                            반납하기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RentalDetailPage;