import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Link, useNavigate } from 'react-router-dom';
import Pagenation from '../../components/common/Pagenation';

const ListPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // 로딩 상태를 관리하는 상태 변수, 초기값은 true로 설정
  // 상품 목록 데이터를 관리하는 상태 변수, 초기값은 빈 배열로 설정

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(productList.length / itemsPerPage)

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [])
  //상품 목록을 가져오는 함수
  // 컴포넌트가 처음 렌더링될 때 fetchProduct 함수를 호출하여 상품 목록을 불러옴

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/products");

      if (Array.isArray(data)) {
        setProductList(data)
      } else {
        setError("데이터 형식이 올바르지 않습니다")
      }
    } catch (error) {
      setError("상품 목록을 불러오는데 실패했습니다")
      console.error("Fetch Error", error)
    } finally {
      setLoading(false)
    }
  }
  // 서버로 부터 상품 목록을 GET 요청
  // 받은 데이터가 배열인지 확인
  // 배열일 경우, productList상태로 설정
  // 배열이 아닌 경우, 오류 메시지 설정

  const handleDelete = async (productId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${productId}`);
        alert('삭제되었습니다.');
        fetchProduct(); // 목록 새로고침
      } catch (error) {
        setError('삭제에 실패했습니다.');
        console.error('Delete Error:', error);
      }
    }
  };

  /**
   * 주요기능
   * 1. 상품 목록 가져오기 : useEffect에서 fetchProduct 함수를 호출, 상품 목록을 서버에서 가져옴
   * 2. 상품 목록 표시 : productList의 데이터를 그리드 형식으로 렌더링 하여 사용자에게 상품을 보여줌
   * 3. 로딩 상태 관리 : loading 상태를 데이터가 로드 될 때 까지 로딩 메시지를 표시
   */

  return (
      <div className="flex flex-col min-h-screen"> {/* 전체 컨테이너를 flex-col로 변경 */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>상품 목록</h2>
          <div className='flex gap-2'>
          {isLoggedIn && (
        <button 
            onClick={() => navigate('/product/add')}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            상품 등록
        </button>
    )}
    <button 
        onClick={() => navigate('/product')}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >
        이전
    </button>
          </div>
        </div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        {loading ? (
          <div className='text-center py-4'> 로딩중... </div>
        ) : productList.length ? (
          <div className="flex flex-col flex-grow"> {/* 컨텐츠 영역을 flex-col로 설정 */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8'> {/* 하단 여백 추가 */}
              {currentItems.map(({ product_id, product_name, facility_id, facility_name, price, attachFiles }) => (
                <div key={product_id}
                  className='bg-white p-4 rounded shadow hover:shadow-md transition-shadow'>
                  {/* 이미지 섹션 */}
                  <div className="mb-4 h-48 overflow-hidden rounded">
                    {attachFiles && attachFiles.length > 0 ? (
                      <img
                        src={`http://localhost:8080/api/products/images/${attachFiles[0].fileName}`}
                        alt={product_name}
                        className="w-full h-48 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/no-image.png';
                          e.target.onerror = null;
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">
                        <span className="text-gray-400">이미지 없음</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/product/detail/${product_id}`}
                    className='block text-lg font-semibold mb-2 hover:text-blue-600 transition-colors'
                  >
                    {product_name}
                  </Link>
                  <p className='text-gray-600 mb-2'>
                    {facility_name || '시설 정보 없음'}
                    <span className='text-gray-400 text-sm ml-2'>
                      (ID: {facility_id})
                    </span>
                  </p>
                  <p className='text-lg font-bold text-blue-600'>
                    {(price ? Number(price) : 0).toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>

            {/* 페이지네이션을 하단에 배치 */}
            {totalPages > 1 && (
              <div className="mt-auto"> {/* 하단에 자동으로 배치되도록 설정 */}
                <Pagenation
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        ) : (
          <div className='text-center py-8 text-gray-500'>
            등록된 상품이 없습니다
          </div>
        )}
      </div>
  );
};

export default ListPage;