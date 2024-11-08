import axios from 'axios';
import React, { useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useNavigate } from 'react-router-dom';

const initProduct = {
  facility_id: 0,
  product_name: "",
  price: 0
};
// 제품의 초기 상태 값을 정의

const ProductAddPage = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState(initProduct);
  const [files, setFiles] = useState([])
  const [error, setError] = useState('');
  // 제품 정보를 담을 상태 변수를 초기값으로 설정
  // 오류 메시지를 관리할 상태 변수르 빈 문자열로 초기화

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  // 입력 필드의 name과 value를 추출
  // 이전 상태를 복사하고, 입력된 name에 해당하는 값을 업데이트

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!product.product_name.trim()) {
      setError('상품을 입력해주세요')
      return
    }
    if (!product.price || product.price <= 0) {
      setError('가격을 입력해주세요')
      return
    }

    try {
      // FormData 객체 생성
      const formData = new FormData();
      
      // 상품 정보를 JSON 문자열로 변환하여 추가
      const productData = {
        ...product,
        facility_id: Number(product.facility_id),
        price: Number(product.price)
      };
      formData.append('product', new Blob([JSON.stringify(productData)], {
        type: 'application/json'
      }));

      // 파일들 추가
      files.forEach(file => {
        formData.append('files', file);
      });

      // 서버로 전송
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('상품이 등록되었습니다');
      navigate('/product/list');
    } catch (error) {
      setError('상품 등록에 실패했습니다');
      console.error('post error', error);
    }
  }
  // 기본 폼 제출 동작을 방지
  // product_name이 비어있는지 확인
  // 비어 있으면 오류 메시지를 설정, 함수 실행을 종료
  // price가 0 이하인 경우
  // 오류 메시지를 설정, 함수 실행을 종료
  // facility_id를 숫자로 변환하여 전달
  // price를 숫자로 변환하여 전달

  /**
   * 주요 기능
   * 1. 상태 관리 : product 상태로 제품 정보를 관리, error 상태로 오류 메시지를 관리
   * 2. 폼 제출 처리 : 폼 제출 시 유효성을 검사하고, 서버에 요청을 보내 제품믈 등록
   * 3. 폼 입력 처리 : 각 입력 필드의 값 변경 시 handleChangeProduct 가 호출, 상태를 업데이트
   */

  return (
      <div className='p-4 max-w-md mx-auto'>
        <h1 className='text-2xl font-bold mb-6'> 상품 등록 </h1>
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              facility_id 시설 아이디
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                type="text"
                name="facility_id"
                value={product.facility_id}
                onChange={handleChangeProduct} />
            </label><br />
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              product_name 상품 이름
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleChangeProduct} />
            </label><br />
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              price 가격
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                type="text"
                name="price"
                value={product.price}
                onChange={handleChangeProduct} />
            </label><br />
          </div>

          <div className="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              상품 이미지
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
          </div>
          
          <div className='flex justify-end space-x-2'>
            <button type='button'
              onClick={() => navigate('/product')}
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
              취소
            </button>
            <button type='submit'
              onClick={handleSubmit}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              등록
            </button>
          </div>
        </form>
      </div>
  );
};

export default ProductAddPage;