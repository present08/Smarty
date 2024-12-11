import React, { useState } from 'react'
import '../../css/rentalInfo.css'

const RentalInfo = ({ product, quantity, price }) => {
    const [imageError, setImageError] = useState(false);

    if (!product) return null;

    // 날짜 포맷팅 함수
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + 3);

    // 이미지 URL 생성 함수
    const getImageUrl = () => {
        if (imageError || !product.attachFiles?.[0]?.fileName) {
            return '/no-image.png';
        }
        return `http://localhost:8080/api/user/products/images/${product.attachFiles[0].fileName}`;
    };

    return (
        <div className="rental-info">
            <h3 className="rental-title">주문하실 상품 ( {quantity}개 )</h3>
            
            <div className="rental-table">
                <table>
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>대여 및 사용일자</th>
                            <th>금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="product-cell">
                                <div className="product-info">
                                    <div className="product-image">
                                        <img
                                            src={getImageUrl()}
                                            alt={product.product_name}
                                            onError={() => setImageError(true)}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="product-details">
                                        <p>{product.product_name}</p>
                                        <p>{product.size}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{quantity}개</td>
                            <td className="date-cell">
                                <div className="rental-date">
                                    <span className="date-label">대여일</span>
                                    <span>{formatDate(today)}</span>
                                </div>
                                <div className="return-date">
                                    <span className="date-label">반납일</span>
                                    <span>{formatDate(returnDate)}</span>
                                </div>
                            </td>
                            <td>{price?.toLocaleString()}원</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="total-summary">
                <p>
                    총 주문금액 {price?.toLocaleString()}원  
                    = 총 결제금액: {(price).toLocaleString()}원
                </p>
            </div>
        </div>
    )
}

export default RentalInfo