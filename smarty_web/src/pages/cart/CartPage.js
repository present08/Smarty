import React, { useEffect, useState } from "react";
import cartApi, { updateCartItem } from "../../api/cartApi";
import CartList from "../../component/cart/CartList";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentModal from "../../component/payment/PaymentModal"; // 결제 모달 추가
import "../../css/cart.css";
import axios from "axios";
import { cartRental } from "../../api/rentalAPI";
import { rentalPayment } from "../../api/paymentAPI";
import MainNav from "../../component/MainNav";
import Wrapper from "../../component/Wrapper";
import Footer from "../../component/Footer";


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
    }, [user_id, location.key]);

    const loadCartItems = async () => {
        try {
            const response = await cartApi.getCartItems(user_id);
            console.log("불러온 장바구니 데이터", response)
            setCartItems(response.data);
        } catch (error) {
            console.error("Failed to load cart items:", error);
        }
    };

    const handleUpdateCart = async (cart_id, quantity) => {
        try {
            await updateCartItem({ cart_id, quantity });
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

    const handlePaymentComplete = async (paymentData) => {
        console.log("paymentData 데이터 : ", paymentData)
        console.log("paymentData 데이터 전송 확인 : ", paymentData)
        console.log("cartItems 데이터 : ", cartItems);

        try {
            setIsPaymentModal(false); // 모달 닫기

            const rentalResponse = await cartRental(cartItems);
            console.log("렌탈 완료 응답 데이터: ", rentalResponse);

            const paymentResponse = await rentalPayment(paymentData);
            console.log("결제 완료 응답 데이터: ", paymentResponse);

            handleClearCart();
            navigate("/payment/success", {
                state: {
                    paymentId: paymentResponse.paymentId,
                    items: cartItems.map((item) => ({
                        product_name: item.product_name,
                        count: item.quantity,
                        price: item.price,
                    })),
                    totalAmount: totalPrice,
                },
            });
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
        <div>
            <MainNav />
            <Wrapper />
            <div className="cart-page-container">
                <div className="cart-container">
                    <div className="cart-items">
                        <div className="cart-header">
                            <h1>내 장바구니</h1>
                            <div className="cart-buttons">
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
                        <button className="clear-btn" onClick={handleClearCart}>
                            장바구니 초기화
                        </button>
                        <button className="payment-btn" onClick={handlePaymentClick}>
                            결제하기
                        </button>
                    </div>
                    <PaymentModal
                        isOpen={isPaymentModal}
                        onRequestClose={() => setIsPaymentModal(false)}
                        onPaymentComplete={handlePaymentComplete}
                        amount={totalPrice}
                        rentalInfo={cartItems.map((item) => ({
                            product_id: item.product_id,
                            product_name: item.product_name,
                            count: item.quantity,
                            price: item.price,
                        }))}
                        user_id={user_id}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;