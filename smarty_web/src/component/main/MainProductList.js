import React, { useEffect, useState } from 'react';
import '../../css/mainProductList.css';
import { getProduct, getProductFiles } from '../../api/productApi';
import { useNavigate } from 'react-router-dom';

const MainProductList = ({ productList }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [isExpanded, setIsExpanded] = useState(false);
    const [productFiles, setProductFiles] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProduct();
            setProducts(data);
            console.log("Fetched products:", data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const effectiveProductList = productList || products; // productList가 없으면 products 사용
            if (!effectiveProductList || effectiveProductList.length === 0) {
                console.warn("Effective productList is empty or undefined:", effectiveProductList);
                return;
            }

            try {
                const filesMap = {};
                await Promise.all(
                    effectiveProductList.map(async (product) => {
                        try {
                            const files = await getProductFiles(product.product_id);
                            filesMap[product.product_id] = files.length > 0
                                ? files.map((file) => `http://localhost:8080/api/user/products/images/${file}`)
                                : ['/no-image.png'];
                        } catch (error) {
                            console.error(`Error fetching files for product ${product.product_id}:`, error);
                            filesMap[product.product_id] = ['/no-image.png'];
                        }
                    })
                );
                setProductFiles(filesMap);
                console.log("Updated productFiles:", filesMap);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [productList, products]);

    const handleProductClick = (i) => {
        navigate(`/product/detail/${i.product_id}`, { state: i });
    };

    const handleShowMore = () => {
        setVisibleCount(products.length);
        setIsExpanded(true);
    };

    const handleClose = () => {
        setVisibleCount(8);
        setIsExpanded(false);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    };

    return (
        <div className='mainProductList_container'>
            <div className='mainProductList_box'>
                <div className='mainProductList_header'>
                    <h2><span style={{ color: '#17468c' }}>SMARTY</span> 상품목록</h2>
                    <p>체육 시설에서 필요한 다양한 대여 물품을 한곳에서 만나보세요! 우리의 서비스로 편리하게 운동을 즐기고, 필요한 장비를 손쉽게 빌려가세요.</p>
                </div>
                <div className='mainProductList_body'>
                    {(productList || products).slice(0, visibleCount).map((product) => (
                        <div key={product.product_id} className='mainProductList_cont'>
                            <div className='mainProductImg'>
                                <img
                                    src={productFiles[product.product_id]?.[0] || '/no-image.png'}
                                    alt={product.product_name}
                                    onError={(e) => {
                                        e.target.src = '/no-image.png';
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>
                            <div className='mainProductText'>
                                <h4>{product.product_name}</h4>
                                <p>사이즈 : {product.size}</p>
                                <div>
                                    <p>수량 : {product.stock}개</p>
                                    <h2>{formatPrice(product.price)}원</h2>
                                </div>
                            </div>
                            <div className='mainProductButton'>
                                <button onClick={() => handleProductClick(product)}>상세보기</button>
                            </div>
                        </div>
                    ))}
                </div>
                {visibleCount < products.length && !isExpanded && (
                    <button onClick={handleShowMore} style={{ marginTop: '40px' }}>
                        더보기
                    </button>
                )}
                {isExpanded && (
                    <button onClick={handleClose} style={{ marginTop: '40px' }}>
                        닫기
                    </button>
                )}
            </div>
        </div>
    );
};

export default MainProductList;
