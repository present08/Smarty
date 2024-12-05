import React, { useState } from 'react';
import '../../css/productDetail.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = ({ product }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [quantity, setQuantity] = useState(1)

    const handleDown = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleUp = () => {
        setQuantity(prev => prev + 1)
    }

    const totalPrice = product.price * quantity

    const handleAddCart = async () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        const userStr = localStorage.getItem('user')

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
            await axios.post('http://localhost:8080/api/cart', cartItem)
            alert("장바구니에 추가되었습니다")
            console.log(cartItem)

            const confirmMovetoCart = window.confirm("장바구니로 이동 하시겠습니까?")
            if (confirmMovetoCart) {
                navigate("/cart")
            }
        } catch (error) {
            console.log("장바구니 담기 실패: ", error)
            alert("장바구니 담기 실패했습니다 ")
        }
    }

    const handleRental = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userStr = localStorage.getItem('user');

        if (isLoggedIn !== 'true' || !userStr) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/login');
            return;
        }
        navigate('/rental', {
            state: {
                selectedFacility: location.state?.selectedFacility,
                selectProduct: product,
                facilityProduct: [],
                price: totalPrice,
                quantity: quantity,
                rental: true
            }
        })
    }

    return (
        <>
            <div className="detail-container">
                {/* 왼쪽 이미지 영역 */}
                <div className="detail-image">
                    {product.attachFiles?.length > 0 ? (
                        <img
                            src={`http://localhost:8080/api/products/images/${product.attachFiles[0].fileName}`}
                            alt={product.product_name}
                            onError={(e) => {
                                e.target.src = '/no-image.png';
                                e.target.onerror = null;
                            }}
                        />
                    ) : (
                        <div className="no-image">이미지 없음</div>
                    )}
                </div>

                {/* 오른쪽 상세 정보 영역 */}
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
                                <button onClick={handleDown}>-</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                />
                                <button onClick={handleUp}>+</button>
                                <span className="item-price">
                                    {product.price.toLocaleString()}원
                                </span>
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
                        <button
                            className="wishlist-btn"
                            onClick={handleAddCart}
                        >
                            장바구니
                        </button>
                        <button
                            className="wishlist-btn"
                            onClick={handleRental}
                        >
                            대여하기
                        </button>
                    </div>
                </div>
            </div>
            {/* 상세 설명 섹션 추가 */}
            <div className="product-description">
                <h3 className="description-title">▶ 상세설명</h3>
                test
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