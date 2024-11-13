import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')

        if (token && userStr) {
            setIsLoggedIn(true)
        }
    }, [])

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/products/${product_id}`);
                setProduct(data);
            } catch (error) {
                setError('상품 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [product_id]);

    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8080/api/products/${product_id}`);
                alert('삭제되었습니다.');
                navigate('/product/list');
            } catch (error) {
                setError('삭제에 실패했습니다.');
                console.error('Delete Error:', error);
            }
        }
    };

    const handleAddToCart = async () => {
        try {
            const userStr = localStorage.getItem('user')
            const user = JSON.parse(userStr)

            await axios.post('http://localhost:8080/api/cart', {
                user_id: user.user_id,
                product_id: parseInt(product_id),
                quantity: quantity,
                product_name: product.product_name,
                price: product.price
            })
            if (window.confirm('장바구니에 추가 되었습니다 장바구니로 이동하시겠습니까')) {
                navigate('/cart')
            }
        } catch (error) {
            console.error('장바구니 담기 실패', error)
            alert('장바구니 담기 실패했습니다')
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-xl">로딩중...</div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center p-4">{error}</div>
    );

    if (!product) return (
        <div className="text-center p-4">상품을 찾을 수 없습니다.</div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* 이미지 섹션 */}
                <div className="mb-6">
                    {product.attachFiles && product.attachFiles.length > 0 ? (
                        <img
                            src={`http://localhost:8080/api/products/images/${product.attachFiles[0].fileName}`}
                            alt={product.product_name}
                            className="w-full h-96 object-cover rounded-lg"
                            onError={(e) => {
                                console.log('Image load error'); // 디버깅용
                                e.target.src = '/no-image.png';
                                e.target.onerror = null;
                            }}
                        />
                    ) : (
                        <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
                            <span className="text-gray-400">이미지 없음</span>
                        </div>
                    )}
                </div>

                {/* 상품 정보 */}
                <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
                <div className="space-y-4">
                    <p className="text-gray-600">
                        시설: {product.facility_name || '시설 정보 없음'}
                        <span className="text-gray-400 text-sm ml-2">
                            (ID: {product.facility_id})
                        </span>
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                        {(product.price || 0).toLocaleString()}원
                    </p>

                    {/* 수량 선택 추가 */}
                    {isLoggedIn && (
                        <div className="flex items-center space-x-4 mt-4">
                            <span className="text-gray-600">수량:</span>
                            <div className="flex items-center border rounded">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border-x">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 버튼 그룹 */}
                <div className="mt-8 flex gap-4 justify-end">
                    {isLoggedIn && (
                        <>
                            <button
                                onClick={handleAddToCart}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                            >
                                장바구니
                            </button>
                            <button
                                onClick={() => navigate('/rental/index')}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                            >
                                대여하기
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => navigate('/product/list')}
                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                    >
                        목록으로
                    </button>
                    <button
                        onClick={() => navigate(`/product/edit/${product_id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
                    >
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div >
    );
};

export default DetailPage;