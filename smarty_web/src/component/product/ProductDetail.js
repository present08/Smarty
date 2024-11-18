import React, { useState } from 'react';
import '../../css/productDetail.css'
import { useLocation, useNavigate } from 'react-router-dom';

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

    const handleRental = () => {
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

// import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import MainNav from '../../component/MainNav'
// import Wrapper from '../../component/Wrapper'
// import Footer from '../../component/Footer'


// const RentalPage = () => {
//     const location = useLocation()
//     const navigate = useNavigate()
    
//     const {
//         selectProduct,
//         quantity,
//         price,
//         selectedFacility
//     } = location.state || {}

//     // 필요한 데이터가 없을 경우 처리
//     if (!selectProduct) {
//         return <div>상품 정보를 찾을 수 없습니다.</div>
//     }

//     return (
//         <div>
//             <MainNav />
//             <Wrapper />
//             <div className="rental-container">
//                 <h2>대여 신청</h2>
                
//                 <div className="selected-product-info">
//                     <h3>선택한 상품 정보</h3>
//                     <div className="product-image">
//                         {selectProduct.attachFiles && selectProduct.attachFiles.length > 0 ? (
//                             <img
//                                 src={`http://localhost:8080/api/products/images/${selectProduct.attachFiles[0].fileName}`}
//                                 alt={selectProduct.product_name}
//                                 onError={(e) => {
//                                     e.target.src = '/no-image.png'
//                                     e.target.onerror = null
//                                 }}
//                             />
//                         ) : (
//                             <span>이미지 없음</span>
//                         )}
//                     </div>
//                     <div className="product-details">
//                         <p className="product-name">{selectProduct.product_name}</p>
//                         <p className="product-size">사이즈: {selectProduct.size}</p>
//                         <p className="quantity">수량: {quantity}개</p>
//                         <p className="total-price">총 금액: {price?.toLocaleString()}원</p>
//                     </div>
//                 </div>

//                 {/* 대여 신청 버튼 */}
//                 <div className="rental-submit">
//                     <button 
//                         className="rental-button"
//                         onClick={() => {
//                             // TODO: 대여 신청 API 호출
//                             alert('대여 신청이 완료되었습니다.');
//                             navigate('/mypage'); // 또는 다른 페이지로 이동
//                         }}
//                     >
//                         대여 신청하기
//                     </button>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default RentalPage