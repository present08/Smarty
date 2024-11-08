import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';

const ProductEditPage = () => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [product, setProduct] = useState({
        facility_id: 0,
        product_name: "",
        price: 0
    });
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // 상품 정보 불러오기
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/products/${product_id}`);
                if (data) {
                    setProduct(data);
                } else {
                    setError('상품 정보가 없습니다.');
                }
            } catch (error) {
                setError('상품 정보를 불러오는데 실패했습니다.');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
    
        if (product_id) {
            fetchProduct();
        }
    }, [product_id]);

    const handleChangeProduct = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.product_name.trim()) {
            setError('상품명을 입력해주세요');
            return;
        }
        if (!product.price || product.price <= 0) {
            setError('가격을 입력해주세요');
            return;
        }

        try {
            const formData = new FormData();

            const productData = {
                ...product,
                facility_id: Number(product.facility_id),
                price: Number(product.price)
            };

            formData.append('product', new Blob([JSON.stringify(productData)], {
                type: 'application/json'
            }));

            files.forEach(file => {
                formData.append('files', file);
            });

            await axios.put(`http://localhost:8080/api/products/${product_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('상품이 수정되었습니다');
            navigate('/product/list');
        } catch (error) {
            setError('상품 수정에 실패했습니다');
            console.error('Update error:', error);
        }
    };

    if (loading) {
        return (
         
                <div className='flex justify-center items-center h-screen'>
                    <div className='text-xl'>로딩중...</div>
                </div>
           
        );
    }

    return (
            <div className='p-4 max-w-md mx-auto'>
                <h1 className='text-2xl font-bold mb-6'>상품 수정</h1>
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            facility_id 시설 아이디
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                                type="number"
                                name="facility_id"
                                value={product.facility_id}
                                onChange={handleChangeProduct}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            product_name 상품 이름
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                                type="text"
                                name="product_name"
                                value={product.product_name}
                                onChange={handleChangeProduct}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            price 가격
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChangeProduct}
                            />
                        </label>
                    </div>

                    <div className="mb-6">
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
                        <button
                            type='button'
                            onClick={() => navigate('/product/detail/:product_id')}
                            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                        >
                            취소
                        </button>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            수정
                        </button>
                    </div>
                </form>
            </div>
    );
};

export default ProductEditPage;