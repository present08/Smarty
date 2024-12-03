import React from 'react'
import CartItem from './CartItem'

const CartList = ({ items, onUpdate, onRemove }) => {
    if (items.length === 0) {
        return <p> 장바구니가 비어 있습니다 </p>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>상품</th>
                    <th>수량</th>
                    <th>행위?</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <CartItem
                        key={item.cart_id}
                        item={item}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default CartList