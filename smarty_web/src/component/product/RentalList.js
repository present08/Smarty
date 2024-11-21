import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from './Pagenation'
import { getProductRentalUser } from '../../api/rentalAPI'

const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const [completedRentals, setCompletedRentals] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [rentalCounts, setRentalCounts] = useState({})


    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 로컬 스토리지에서 rentalCounts를 불러오기
    useEffect(() => {
        const storedCounts = localStorage.getItem('rentalCounts');
        if (storedCounts) {
            setRentalCounts(JSON.parse(storedCounts));
        }
    }, []);

    // rentalCounts가 변경될 때 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('rentalCounts', JSON.stringify(rentalCounts));
    }, [rentalCounts]);

    console.log("여기를 확인 렌탈 데이터: ", rentals)

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
            // console.log("API 호출전 : ", user.user_id)
            const rentals = await getProductRentalUser(user.user_id)

            // const rentalsWithCount = rentals.map((rental) => ({
            //     ...rental,
            //     rentalCount: rental.count !== undefined ? rental.count : 1,
            // }))
            // setRentals(rentalsWithCount)
            // console.log("rentalsWithCount: ",rentalsWithCount)

            const counts = rentals.reduce((acc, rental) => {
                acc[rental.rental_id] = rental.count;
                return acc;
            }, {});
            console.log("rentalCounts 초기화 데이터: ", counts)
            setRentalCounts(counts);

            // 대여일 기준으로 정렬 (최신순)
            const sortedRentals = rentals.sort((a, b) =>
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
    const handleReturn = async (rental_id) => {
        const rentalCount = rentalCounts[rental_id];
        console.log("반납 요청 count: ", rentalCount)

        if (!window.confirm('정말 반납하시겠습니까?')) {
            return;
        }
        // if (!rentalCount || rentalCount <= 0) {
        //     alert("반납 수량이 유효하지 않습니다")
        //     return
        // }

        try {
            // count를 params로 전달
            const response = await axios.put(
                `http://localhost:8080/api/rentals/${rental_id}/return`,
                null,
                { params: { count: rentalCount } } // count를 명시적으로 전달
            );

            console.log("반납 데이터", response.data)
            
            if (response.status === 200) {
                alert("반납이 완료되었습니다.");
                getUserRentals(); // 반납 후 목록 새로고침
            }
        } 
        catch (error) {
            console.error("반납 처리 실패:", error);
            alert(error.response?.data || "반납 처리에 실패했습니다.");
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
                                <td className="px-6 py-3 border-b text-left">물품명</td>
                                <td className="px-6 py-3 border-b text-left">대여일</td>
                                <td className="px-6 py-3 border-b text-left">반납예정일</td>
                                <td className="px-6 py-3 border-b text-left">상태</td>
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
                                        {rental.count}
                                    </td>
                                    
                                    <td className="px-6 py-4 border-b">
                                        {rental.rental_status ? (
                                            <span className='text-blue-600'> 대여 중</span>
                                        ) : (
                                            <span className='text-green-600'> 반납 완료 </span>
                                        )}
                                    </td>
                                    {/* <td className="px-6 py-4 border-b">
                                        {rental.rental_status && (
                                            <button
                                                onClick={() => handleReturn(rental.rental_id, rental.count)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                반납하기
                                            </button>
                                        )}
                                    </td> */}
                                    {/* <td>
                                        {rental.rental_status ? (
                                            <button
                                                onClick={() => {
                                                    console.log("rental_id: ", rental.rental_id)
                                                    console.log("rentalCount: ", rental.count)
                                                    handleReturn(rental.rental_id, rental.rentalCount)
                                                }} // rental.count를 명시적으로 전달
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                반납하기
                                            </button>
                                        ) : (
                                            "반납 완료"
                                        )}
                                    </td> */}
                                    <td className="px-6 py-4 border-b">
                                    {rental.rental_status ? (
                                        <button
                                            onClick={() => handleReturn(rental.rental_id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            반납하기
                                        </button>
                                    ) : (
                                        '반납 완료'
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
