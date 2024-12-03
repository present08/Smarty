import React from 'react'

const CartItem = ({ item, onUpdate, onRemove }) => {
    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value, 10)
        if (quantity > 0) {
            onUpdate(item.cart_id, quantity)
        }
    }

    return (
        <tr>
            <td>
                {item.product_id}
            </td>
            <td>
                <input type="number"
                    value={item.quantity}
                    min="1"
                    onChange={handleQuantityChange} />
            </td>
            <td>
                <button onClick={() => onRemove(item.cart_id)}>삭제</button>
            </td>
        </tr>
    )
}

export default CartItem