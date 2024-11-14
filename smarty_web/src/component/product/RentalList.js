import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from '../Pagenation'


const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const [completedRentals, setCompletedRentals] = useState(new Set());
    const [userId, setUserId] = useState(null)
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rentals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(rentals.length / itemsPerPage);

    // 대여 중인 항목만 필터링하는 함수
    const getActiveRentals = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/rentals");
            const activeRentals = response.data
                .filter(rental => {
                    return rental.user_id === userId &&
                        (!rental.return_date || new Date(rental.return_date) > new Date())
                })
                .sort((a, b) => a.rental_id - b.rental_id);
            setRentals(activeRentals);
        } catch (error) {
            console.error("대여 목록 조회 실패:", error);
            alert("대여 목록을 불러오는데 실패했습니다.");
        }
    };

    useEffect(() => {
        const userStr = localStorage.getItem('user')
        const user = JSON.parse(userStr)
        setUserId(user.user_id)
    }, [])

    // 컴포넌트 마운트 시 대여 목록 조회
    useEffect(() => {
        if (userId) {
            getActiveRentals();
        }
    }, [userId]);

    const handleReturn = async (rentalId) => {
        if (!window.confirm('정말 반납하시겠습니까?')) {
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/rentals/${rentalId}/return`);
            if (response.status === 200) {
                alert("반납이 완료되었습니다.");
                // 반납 완료된 항목을 Set에 추가
                setCompletedRentals(prev => new Set([...prev, rentalId]));
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

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-extrabold'>대여 목록</h1>
                <button onClick={() => navigate('/rental')}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
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
                                <th className="px-6 py-3 border-b text-left">대여 ID</th>
                                <th className="px-6 py-3 border-b text-left">사용자 ID</th>
                                <th className="px-6 py-3 border-b text-left">물품명</th>
                                <th className="px-6 py-3 border-b text-left">대여일</th>
                                <th className="px-6 py-3 border-b text-left">반납예정일</th>
                                <th className="px-6 py-3 border-b text-left">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((rental) => (
                                <tr key={rental.rental_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">
                                        <Link
                                            to={`/rental/detail/${rental.rental_id}`}
                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            {rental.rental_id}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 border-b">{rental.user_id}</td>
                                    <td className="px-6 py-4 border-b">{rental.product_name}</td>
                                    <td className="px-6 py-4 border-b">
                                        {formatDateTime(rental.rental_date)}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {formatDateTime(rental.return_date)}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <div className="flex items-center gap-2">
                                            {completedRentals.has(rental.rental_id) ? (
                                                <span className="text-green-600">반납 완료</span>
                                            ) : (
                                                <Link
                                                    to={`/rental/detail/${rental.rental_id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    대여 중 (상세보기)
                                                </Link>
                                            )}
                                        </div>
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

export default RentalList