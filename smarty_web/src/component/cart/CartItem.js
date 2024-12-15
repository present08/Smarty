import React from "react";

const CartItem = ({ item, onUpdate, onRemove }) => {

    const handleUpQuantity = () => {
        onUpdate(item.cart_id, item.quantity + 1)
    }

    const handleDownQuantity = () => {
        if (item.quantity > 1) {
            onUpdate(item.cart_id, item.quantity - 1)
        }
    }

    return (
        <tr>
            <td className="cart-item-image">
                {item.file_name ? (
                    <img
                        src={`http://localhost:8080/api/user/reservation/uploads/s_${item.file_name}`}
                        alt={item.product_name}
                        onError={(e) => {
                            e.target.src = "/no-image.png"; // 기본 이미지
                            e.target.onerror = null;
                        }}
                    />
                ) : (
                    <p>이미지 없음</p>
                )}
            </td>
            <td className="cart-item-name">
                {item.product_name}
            </td>
            <td className="cart-item-quantity">
                <button className="quantity-btn" onClick={handleUpQuantity}>
                    +
                </button>
                <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="quantity-input"
                />
                <button className="quantity-btn" onClick={handleDownQuantity}>
                    -
                </button>
            </td>
            <td className="cart-item-price">
                {item.price.toLocaleString()} 원
            </td>
            <td className="cart-item-remove">
                <button className="remove-btn" onClick={() => onRemove(item.cart_id)}>
                    제거
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
