import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from './Pagenation'

const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const [completedRentals, setCompletedRentals] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 로그인한 사용자의 대여 목록 조회
    const getUserRentals = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/user/login');
                return;
            }

            const user = JSON.parse(userStr);
            const response = await axios.get(`http://localhost:8080/api/rentals/user/${user.user_id}`);
            
            // 대여일 기준으로 정렬 (최신순)
            const sortedRentals = response.data.sort((a, b) => 
                new Date(b.rental_date) - new Date(a.rental_date)
            );
            
            setRentals(sortedRentals);
        } catch (error) {
            console.error("대여 목록 조회 실패:", error);
            alert("대여 목록을 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserRentals();
    }, []);

    // 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rentals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(rentals.length / itemsPerPage);

    // 날짜 포맷팅
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

    // 반납 처리
    const handleReturn = async (rentalId) => {
        if (!window.confirm('정말 반납하시겠습니까?')) {
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/rentals/${rentalId}/return`);
            if (response.status === 200) {
                alert("반납이 완료되었습니다.");
                setCompletedRentals(prev => new Set([...prev, rentalId]));
                getUserRentals(); // 목록 새로고침
            }
        } catch (error) {
            console.error("반납 처리 실패:", error);
            alert("반납 처리 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return <div className="text-center py-8">로딩 중...</div>;
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-extrabold'>내 대여 목록</h1>
                <button 
                    onClick={() => navigate(-1)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    이전
                </button>
            </div>

            {rentals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    대여한 물품이 없습니다.
                </div>
            ) : (
                <div className="flex flex-col">
                    <table className="min-w-full bg-white border rounded-lg mb-4">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b text-left">물품명</th>
                                <th className="px-6 py-3 border-b text-left">대여일</th>
                                <th className="px-6 py-3 border-b text-left">반납예정일</th>
                                <th className="px-6 py-3 border-b text-left">상태</th>
                                <th className="px-6 py-3 border-b text-left">액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((rental) => (
                                <tr key={rental.rental_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{rental.product_name}</td>
                                    <td className="px-6 py-4 border-b">
                                        {formatDateTime(rental.rental_date)}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {formatDateTime(rental.return_date)}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {completedRentals.has(rental.rental_id) ? (
                                            <span className="text-green-600">반납 완료</span>
                                        ) : (
                                            <span className="text-blue-600">대여 중</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {!completedRentals.has(rental.rental_id) && (
                                            <button
                                                onClick={() => handleReturn(rental.rental_id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                반납하기
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="mt-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RentalList;
