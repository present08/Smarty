import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const formatDate = (date) => {
  return date.toISOString().slice(0,19)
}

const initRental = {
  product_id: null,
  rental_date: formatDate(new Date()),
  return_date: formatDate(new Date(new Date().setDate(new Date().getDate()+7)))
}

const RentalSummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const facility = queryParams.get('facility');
  const product = queryParams.get('product');
  const price = queryParams.get('price');
  const productId = queryParams.get('product_id');

  // 로그인 체크 및 사용자 정보 가져오기
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // 초기 상태 설정
  const [rental, setRental] = useState({
    ...initRental,
    user_id: user ? Number(user.user_id) : null,  // 사용자 ID 초기화
    product_id: productId ? Number(productId) : null  // 상품 ID 초기화
  });

  useEffect(() => {
    // 로그인 체크
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate('/login');
      return;
    }

    // 필수 파라미터 체크
    if (!productId) {
      alert("상품 정보가 없습니다.");
      navigate('/rental');
      return;
    }

    // rental 상태 업데이트
    setRental(prev => ({
      ...prev,
      user_id: Number(user.user_id),
      product_id: Number(productId)
    }));
  }, []);

  const postRental = async () => {
    try {
      // 데이터 유효성 검사
      if (!rental.user_id || rental.user_id === 0) {
        alert("유효한 사용자 정보가 없습니다. 다시 로그인해주세요.");
        navigate('/login');
        return;
      }

      if (!rental.product_id) {
        alert("상품 정보가 없습니다.");
        return;
      }

      console.log("전송할 데이터:", rental);

      const response = await axios.post("http://localhost:8080/api/rentals", {
        ...rental,
        user_id: Number(rental.user_id),
        product_id: Number(rental.product_id)
      });

      console.log("응답 데이터:", response.data);
      alert("대여가 성공적으로 완료되었습니다.");
      navigate('/rental/list');
    } catch (error) {
      console.error("대여 처리 중 오류 발생:", error);
      alert(error.response?.data || "대여 처리 중 오류가 발생했습니다.");
    }
  };

  // 로그인 상태가 아닌 경우
  if (!user) {
    return (
      <BasicLayout>
        <div className="text-center mt-10">
          <h2 className="text-xl">로그인이 필요한 서비스입니다.</h2>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            로그인하기
          </button>
        </div>
      </BasicLayout>
    );
  }

  return (
      <div className='p-4'>
        <h1 className='text-3xl font-extrabold mb-6'>대여 최종 확인</h1>
        <div className='space-y-4 text-xl'>
          <p><span className='font-semibold'>시설:</span> {facility}</p>
          <p><span className='font-semibold'>물품:</span> {product}</p>
          <p><span className='font-semibold'>가격:</span> {price}</p>
          <p><span className='font-semibold'>대여일:</span> {new Date(rental.rental_date).toLocaleDateString()}</p>
          <p><span className='font-semibold'>반납일:</span> {new Date(rental.return_date).toLocaleDateString()}</p>
        </div>
        <button 
          onClick={postRental}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          대여하기
        </button>
      </div>
  );
};

export default RentalSummaryPage