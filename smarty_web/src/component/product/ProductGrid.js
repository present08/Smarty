import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductFiles } from '../../api/productApi';

const ProductGrid = ({ productList, selectedFacility }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [productFiles, setProductFiles] = useState({}); // 상품 ID별 이미지 파일 데이터를 저장

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const filesMap = {};
                await Promise.all(
                    productList.map(async (product) => {
                        const files = await getProductFiles(product.product_id).catch(() => []);
                        filesMap[product.product_id] = files.length > 0
                            ? files.map((file) => `http://localhost:8080/api/product/products/images/${file}`)
                            : ['/no-image.png']; // 기본 이미지 설정
                    })
                );
                setProductFiles(filesMap);
                console.log('Updated productFiles:', filesMap); // 디버깅 로그
            } catch (error) {
                console.error('이미지 파일 조회 실패:', error.response?.data || error.message);
            }
        };

        if (productList.length > 0) {
            fetchImages();
        }
    }, [productList]);

    const handleProduct = (product_id) => {
        navigate(`/product/detail/${product_id}`, {
            state: {
                from: location,
                selectedFacility: selectedFacility,
            },
        });
    };

    return (
        <div className="product-container">
            <h2 className="product-title">대여 가능한 물품</h2>
            <div className="products-grid">
                {productList.map((item) => (
                    <div
                        key={item.product_id}
                        className="product-card"
                        onClick={() => handleProduct(item.product_id)}
                    >
                        <div className="product-image-container">
                            {productFiles[item.product_id]?.length > 0 ? (
                                <img
                                    src={productFiles[item.product_id][0]} // 첫 번째 이미지 URL
                                    alt={item.product_name}
                                    className="product-image"
                                    onError={(e) => {
                                        e.target.src = '/no-image.png'; // 기본 이미지로 대체
                                        e.target.onerror = null;
                                    }}
                                />
                            ) : (
                                <div className="no-image">
                                    <span className="text-gray-400">이미지 없음</span>
                                </div>
                            )}
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">{item.product_name}</h3>
                            <p className="product-size">{item.size || '사이즈 없음'}</p>
                            <p className="product-price">{item.price.toLocaleString()} 원</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
