import React, { useEffect, useState } from "react";
import cartApi, { updateCartItem } from "../../api/cartApi";
import CartList from "../../component/cart/CartList";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentModal from "../../component/payment/PaymentModal"; // 결제 모달 추가
import "../../css/cart.css";
import MainNav from "../../component/MainNav";
import Wrapper from "../../component/Wrapper";
import Footer from "../../component/Footer";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isPaymentModal, setIsPaymentModal] = useState(false); // 결제 모달 상태
    const userStr = localStorage.getItem("user");
    const user_id = userStr ? JSON.parse(userStr).user_id : null;
    const navigate = useNavigate();

    // 장바구니 데이터 로드
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
            console.log("불러온 장바구니 데이터", response);
            if (response.data) {
                setCartItems(response.data);
            } else {
                console.error("장바구니 데이터가 비어 있습니다.");
                setCartItems([]);
            }
        } catch (error) {
            console.error("장바구니 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    const handleUpdateCart = async (cart_id, quantity) => {
        try {
            await updateCartItem({ cart_id, quantity });
            const updatedItems = cartItems.map((item) =>
                item.cart_id === cart_id ? { ...item, quantity } : item
            );
            setCartItems(updatedItems);
            localStorage.setItem("cart", JSON.stringify(updatedItems));
        } catch (error) {
            console.error("Failed to update cart item:", error);
        }
    };

    const handleRemoveCartItem = async (cart_id) => {
        try {
            await cartApi.removeCartItem(cart_id);
            const updatedItems = cartItems.filter((item) => item.cart_id !== cart_id);
            setCartItems(updatedItems);
            localStorage.setItem("cart", JSON.stringify(updatedItems));
        } catch (error) {
            console.error("Failed to remove cart item:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await cartApi.clearCart(user_id);
            setCartItems([]);
            localStorage.removeItem("cart");
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
        console.log("paymentData 데이터 : ", paymentData);
        console.log("cartItems 데이터 : ", cartItems);

        try {
            setIsPaymentModal(false); // 모달 닫기

            const rentalResponse = await cartApi.cartRental(cartItems);
            console.log("렌탈 완료 응답 데이터: ", rentalResponse);

            const paymentResponse = await cartApi.rentalPayment(paymentData);
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

    return (
        <div className="cart-page-container">
            {/* 상단 네비게이션 */}
            <MainNav />
            <Wrapper />

            {/* 장바구니 내용 */}
            <div className="cart-container">
                {/* 장바구니 아이템 */}
                <div className="cart-items">
                    <div className="cart-header">
                        <h1>내 장바구니</h1>
                        <button className="back-btn" onClick={handleBack}>
                            이전
                        </button>
                    </div>
                    {cartItems.length > 0 ? (
                        <CartList
                            items={cartItems}
                            onUpdate={handleUpdateCart}
                            onRemove={handleRemoveCartItem}
                        />
                    ) : (
                        <p style={{ textAlign: "center", color: "#555" }}>
                            장바구니에 물품이 없습니다.
                        </p>
                    )}
                </div>

                {/* 주문 요약 */}
                <div className="cart-summary">
                    <h2 className="summary-title">주문 정보</h2>
                    <div className="summary-line">
                        <span>총 수량</span>
                        <span>{totalQuantity} 개</span>
                    </div>
                    <div className="summary-line">
                        <span>총 금액</span>
                        <span>{totalPrice.toLocaleString()} 원</span>
                    </div>
                    <div className="buttons-container">
                        <button className="clear-btn" onClick={handleClearCart}>
                            장바구니 초기화
                        </button>
                        <button className="payment-btn" onClick={handlePaymentClick}>
                            결제하기
                        </button>
                    </div>
                </div>

                {/* 결제 모달 */}
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

            {/* 하단 푸터 */}
            <Footer />
        </div>
    );
};

export default CartPage;
