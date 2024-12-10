import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi";
import CartList from "../../component/cart/CartList";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentModal from "../../component/payment/PaymentModal"; // 결제 모달 추가
import "../../css/cart.css";
import axios from "axios";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isPaymentModal, setIsPaymentModal] = useState(false); // 결제 모달 상태
    const userStr = localStorage.getItem("user");
    const user_id = userStr ? JSON.parse(userStr).user_id : null;
    const navigate = useNavigate();
    const location = useLocation()


    useEffect(() => {
        if (!user_id) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/user/login");
        } else {
            loadCartItems();
        }
    }, [user_id]);



    const loadCartItems = async () => {
        try {
            const response = await cartApi.getCartItems(user_id);
            console.log("불러온 장바구니 데이터", response.data)
            setCartItems(response.data);
        } catch (error) {
            console.error("Failed to load cart items:", error);
        }
    };

    const handleUpdateCart = async (cart_id, quantity) => {
        try {
            await cartApi.updateCartItem({ cart_id, quantity });
            loadCartItems();
        } catch (error) {
            console.error("Failed to update cart item:", error);
        }
    };

    const handleRemoveCartItem = async (cart_id) => {
        try {
            await cartApi.removeCartItem(cart_id);
            loadCartItems();
        } catch (error) {
            console.error("Failed to remove cart item:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await cartApi.clearCart(user_id);
            loadCartItems();
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    const handleBack = () => {
        navigate("/product");
    };

    // 총 수량 계산
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // 총 금액 계산
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    // 결제 버튼 클릭 시 모달 열기
    const handlePaymentClick = () => {
        if (cartItems.length === 0) {
            alert("장바구니가 비어 있습니다.");
            return;
        }
        setIsPaymentModal(true);
    };

    // 결제 완료 처리
    const handlePaymentComplete = async (paymentData) => {
        console.log("payment 데이터 : ", paymentData)
        try {
            setIsPaymentModal(false); // 모달 닫기
            const response = await axios.post(
                "http://localhost:8080/api/payment/create", // 결제 API 엔드포인트
                paymentData
            );
            console.log("결제 데이터 확인 : ", response.data)
            const paymentId = response.data; // 서버에서 반환된 결제 ID

            // 결제 성공 시 페이지로 이동하면서 데이터 전달
            navigate("/payment/success", {
                state: {
                    paymentId: paymentId,
                    items: cartItems.map((item) => ({
                        product_name: item.product_name,
                        count: item.quantity,
                        price: item.price,
                    })),
                    totalAmount: totalPrice,
                },
            });

            handleClearCart(); // 장바구니 초기화
        } catch (error) {
            console.error("결제 실패: ", error);
            alert("결제 중 문제가 발생했습니다.");
        }
    };

    const rentalInfo = cartItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        count: item.quantity,
        price: item.price,
    }));

    useEffect(() => {
        console.log("CartPage에서 rentalInfo 데이터 확인: ", rentalInfo);
    }, [cartItems]);


    return (
        <div className="cart-container">
            <div className="cart-items">
                <div className="cart-header">
                    <h1>내 장바구니</h1>
                    <div className="cart-buttons">
                        <button className="clear-btn" onClick={handleClearCart}>
                            장바구니 초기화
                        </button>
                        <button className="back-btn" onClick={handleBack}>
                            이전
                        </button>
                    </div>
                </div>
                <CartList
                    items={cartItems}
                    onUpdate={handleUpdateCart}
                    onRemove={handleRemoveCartItem}
                />
            </div>
            <div className="cart-summary">
                <h2>주문 정보</h2>
                <div className="summary-line">
                    <span>총 수량</span>
                    <span>{totalQuantity} 개</span>
                </div>
                <div className="summary-line">
                    <span>총 금액</span>
                    <span>{totalPrice.toLocaleString()} 원</span>
                </div>
                <button
                    className="payment-btn"
                    onClick={handlePaymentClick}
                >
                    결제하기
                </button>
            </div>

            {/* 결제 모달 */}
            <PaymentModal
                isOpen={isPaymentModal}
                onRequestClose={() => setIsPaymentModal(false)}
                onPaymentComplete={handlePaymentComplete}
                amount={totalPrice}
                rentalInfo={cartItems.map((item) => ({ // 장바구니 정보를 가공
                    product_id: item.product_id,
                    product_name: item.product_name,
                    count: item.quantity,
                    price: item.price,
                }))}
                user_id={user_id}
            />
            
        </div>
    );
};

export default CartPage;