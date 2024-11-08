package com.green.smarty.service;

import com.green.smarty.vo.CartVO;

import java.util.List;

public interface CartService {
    List<CartVO> getCartList(Long user_id);
    void addToCart(CartVO vo);
    void updateQuantity(Long cart_id, int quantity);
    void deleteCartItem(Long cart_id);
    void clearCart(Long user_id);
    boolean isCartItemExists(Long user_id, Long product_id);
}
