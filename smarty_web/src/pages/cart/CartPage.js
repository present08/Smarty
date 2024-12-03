import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi";
import CartList from "../../component/cart/CartList";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const userId = "user123"; // 로그인된 사용자 ID

    // 장바구니 데이터 로드
    const loadCartItems = async () => {
        try {
            const response = await cartApi.getCartItems(userId);
            setCartItems(response.data);
        } catch (error) {
            console.error("Failed to load cart items:", error);
        }
    };

    // 수량 업데이트
    const handleUpdateCart = async (cartId, quantity) => {
        try {
            await cartApi.updateCartItem({ cartId, quantity });
            loadCartItems();
        } catch (error) {
            console.error("Failed to update cart item:", error);
        }
    };

    // 항목 삭제
    const handleRemoveCartItem = async (cartId) => {
        try {
            await cartApi.removeCartItem(cartId);
            loadCartItems();
        } catch (error) {
            console.error("Failed to remove cart item:", error);
        }
    };

    // 장바구니 비우기
    const handleClearCart = async () => {
        try {
            await cartApi.clearCart(userId);
            loadCartItems();
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    useEffect(() => {
        loadCartItems();
    }, []);

    return (
        <div>
            <h1>내 장바구니</h1>
            <CartList
                items={cartItems}
                onUpdate={handleUpdateCart}
                onRemove={handleRemoveCartItem}
            />
            <div>
                <button onClick={handleClearCart}>장방구니 초기화</button>
            </div>
        </div>
    );
};

export default CartPage;
