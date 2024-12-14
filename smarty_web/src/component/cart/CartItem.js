import React from "react";

const CartItem = ({ item, onUpdate, onRemove }) => {

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value, 10);
        if (quantity > 0) {
            onUpdate(item.cart_id, quantity);
        }
    };

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
                />
                <button className="quantity-btn" onClick={handleDownQuantity}>
                    -
                </button>
            </td>
            <td className="cart-item-price">
                {item.price.toLocaleString()} 원
            </td>
            <td className="cart-item-remove">
                <button onClick={() => onRemove(item.cart_id)}>삭제</button>
            </td>
        </tr>
    );
};

export default CartItem;
