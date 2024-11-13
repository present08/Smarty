import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initRental = {
    user_id: '',
    product_id: '',
    rental_date: "2024-00-00T00:00:00",
    return_date: "2024-00-00T00:00:00"
}

const IndexPage = () => {
    const navigate = useNavigate();
    const [rental, setRental] = useState(initRental);
    const [facility, setFacility] = useState([]);
    const [product, setProduct] = useState([]);
    const [selectPrice, setSelectPrice] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const facilityRes = await axios.get("http://localhost:8080/api/facilitys");
                console.log("시설 데이터 원본:", facilityRes);  // 전체 응답 확인

                if (facilityRes.status === 200 && facilityRes.data) {
                    console.log("시설 데이터:", facilityRes.data);
                    setFacility(facilityRes.data);
                }

                const productRes = await axios.get("http://localhost:8080/api/products");
                if (productRes.status === 200 && productRes.data) {
                    setProduct(productRes.data);
                    setAllProducts(productRes.data);
                }

            } catch (error) {
                console.error("데이터 로딩 중 오류:", error);
                if (error.response) {
                    console.error("서버 응답:", error.response);
                }
                setError("데이터를 불러오는데 실패했습니다");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChangeRental = (e) => {
        const { name, value } = e.target;
        console.log(`선택된 값:`, { name, value });

        if (name === 'facility_id') {
            if (!value) {  // 시설 선택이 초기화될 때
                setRental(initRental);  // 전체 rental 상태를 초기화
                setProduct([]);         // 제품 목록 초기화
                setSelectPrice('');     // 선택된 가격 초기화
                return;
            }

            // 새로운 시설이 선택된 경우
            setRental(prev => ({
                ...initRental,  // 다른 값들은 초기화
                facility_id: value  // 새로 선택된 시설 ID만 설정
            }));
            setSelectPrice('');  // 가격 초기화

            const facilityId = parseInt(value);
            const filteredProducts = allProducts.filter(item =>
                item && item.facility_id === facilityId
            );
            setProduct(filteredProducts);
        } else {
            setRental(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleChagneSubmit = () => {
        if (!rental.facility_id || !rental.product_id) {
            alert("시설과 물품을 모두 선택해주세요.");
            return;
        }

        const selectedFacility = facility.find(item =>
            item && item.facility_id === parseInt(rental.facility_id)
        );
        const selectedProduct = product.find(item =>
            item && item.product_id === parseInt(rental.product_id)
        );

        if (selectedFacility && selectedProduct) {
            navigate(`/rental/summary?facility=${selectedFacility.facility_name}&product=${selectedProduct.product_name}&price=${selectPrice}&user_id=${rental.user_id}&product_id=${rental.product_id}`);
        } else {
            alert("선택한 시설 또는 물품 정보를 찾을 수 없습니다.");
        }
    };

    if (loading) return <div className="loading">로딩중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='container mx-auto px-4'>
                {/* 시설 선택 부분 */}
                <div className='mb-8 bg-white rounded-lg shadow-md p-5'>
                    <select
                        name="facility_id"
                        onChange={handleChangeRental}
                        value={rental.facility_id || ""}
                        className='w-full p-2.5 border border-gray-300 rounded'
                    >
                        <option value="">시설을 선택하세요</option>
                        {facility.map((item, index) => (
                            <option
                                key={`facility-${item.facility_id || index}`}
                                value={item.facility_id || ''}
                            >
                                {item.facility_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 선택된 시설의 물품 목록 */}
                {rental.facility_id && rental.facility_id !== '' && product.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">대여 가능한 물품</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {product.map((item) => (
                                <div
                                    key={item.product_id}
                                    onClick={() => {
                                        setRental(prev => ({ ...prev, product_id: item.product_id }));
                                        setSelectPrice(`${item.price} 원`);
                                    }}
                                    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer
                                        ${rental.product_id === item.product_id ? 'ring-2 ring-blue-500' : ''}`}
                                >
                                    <div className="aspect-w-1 aspect-h-1">
                                        {item.attachFiles && item.attachFiles.length > 0 ? (
                                            <img
                                                src={`http://localhost:8080/api/products/images/${item.attachFiles[0].fileName}`}
                                                alt={item.product_name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/no-image.png';
                                                    e.target.onerror = null;
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-400">이미지 없음</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-center mb-2">
                                            {item.product_name}
                                        </h3>
                                        <p className="text-center text-blue-600 font-bold">
                                            {item.price.toLocaleString()} 원
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 선택된 물품 정보 및 버튼 */}
                <div className='flex justify-end gap-4 mb-8 bg-white rounded-lg shadow-md p-5'>
                    <div className='flex items-center'>
                        <span className="font-bold mr-2">선택된 금액:</span>
                        <span className="text-blue-600 font-bold">
                            {selectPrice || '0 원'}  {/* 선택된 금액이 없을 때는 '0 원' 표시 */}
                        </span>
                    </div>
                    <button
                        onClick={handleChagneSubmit}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        대여신청 🔍
                    </button>
                    <button
                        onClick={() => navigate('/rental')}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        이전
                    </button>
                </div>
            </div>

            <footer className='bg-gray-800 text-white p-5 text-center mt-auto'>
                <p className='mb-2.5'>주소</p>
                <p className='mb-2.5'>이용시간: 10:00 ~ 19:00 (주말 및 공휴일 휴무)</p>
                <p className='mb-2.5'>전화: 02-1234-5678 | 이메일:</p>
                <p>&copy; 2024 프로젝트.</p>
            </footer>
            <Outlet />
        </div>
    );
};

export default IndexPage;