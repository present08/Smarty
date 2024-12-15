import React, { useState, useEffect } from 'react';
import '../../css/productDetail.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductFiles } from '../../api/productApi';
import { addCartItem } from '../../api/cartApi';


const ProductDetail = ({ product }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const images = await getProductFiles(product.product_id);
                setProductImages(
                    images.length > 0
                        ? images.map((file) => `http://localhost:8080/api/user/products/images/${file}`)
                        : ['/no-image.png']
                );
            } catch (error) {
                console.error('이미지 불러오기 실패:', error);
            }
        };

        if (product.product_id) {
            fetchImages();
        }
    }, [product.product_id]);

    const handleDown = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleUp = () => {
        setQuantity((prev) => prev + 1);
    };

    const totalPrice = product.price * quantity;

    const handleAddCart = async () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userStr = localStorage.getItem('user');

        if (isLoggedIn !== 'true' || !userStr) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/login');
            return;
        }
        
        const user = JSON.parse(userStr)
        const cartItem = {
            user_id: user.user_id,
            product_id: product.product_id,
            product_name: product.product_name,
            quantity: quantity,
        }
        try {
            const response = await addCartItem([cartItem])
            console.log("장바구니 추가 확인", response)
            alert('장바구니에 추가되었습니다');

            const confirmMovetoCart = window.confirm('장바구니로 이동 하시겠습니까?');
            if (confirmMovetoCart) {
                navigate('/cart', {replace: true});
            }
        } catch (error) {
            console.log('장바구니 담기 실패: ', error);
            alert('장바구니 담기 실패했습니다 ');
        }
    };

    return (
        <>
            <div className="detail-container">
                <div className="detail-image">
                    {productImages.length > 0 ? (
                        productImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.product_name} - 이미지 ${index + 1}`}
                                onError={(e) => {
                                    e.target.src = '/no-image.png';
                                    e.target.onerror = null;
                                }}
                            />
                        ))
                    ) : (
                        <div className="no-image">이미지 없음</div>
                    )}
                </div>

                <div className="detail-info">
                    <h2 className="product-title">{product.product_name}</h2>

                    <div className="price-info">
                        <div className="price-row">
                            <span className="label">가격</span>
                            <span className="price">{product.price.toLocaleString()}원</span>
                        </div>

                        <div className="quantity-info">
                            <span className="label">{product.product_name}</span>
                            <div className="quantity-control">
                                <button onClick={handleUp}>+</button>
                                <input type="number" value={quantity} readOnly />
                                <button onClick={handleDown}>-</button>
                                <span className="item-price">{product.price.toLocaleString()}원</span>
                            </div>
                        </div>

                        <div className="total-price">
                            <span className="label">TOTAL (QUANTITY)</span>
                            <span className="total">
                                {totalPrice.toLocaleString()}원
                                <span className="quantity-label">({quantity}개)</span>
                            </span>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="wishlist-btn" onClick={handleAddCart}>
                            장바구니
                        </button>

                    </div>
                </div>
            </div>
            <div className="product-description">
                <h3 className="description-title">▶ 상세설명</h3>
                <div className="spec-table">
                    <h4>제품상세정보</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>품   명</th>
                                <td>{product.product_name}</td>
                            </tr>
                            <tr>
                                <th>기본구성</th>
                                <td>{product.product_name}</td>
                            </tr>
                            <tr>
                                <th>사이즈</th>
                                <td>{product.size}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="usage-info">
                    <p>{product.description}</p>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
