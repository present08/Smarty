package com.green.smarty.service;

import com.green.smarty.mapper.CartMapper;
import com.green.smarty.vo.CartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CartService{
    @Autowired
    private CartMapper mapper;

    public List<CartVO> getCartList(String user_id) {
        return mapper.selectCartList(user_id);
    }

    public void addToCart(CartVO vo) {
        if (isCartItemExists(vo.getUser_id(),vo.getProduct_id())) {
            mapper.updateQuantity(vo.getCart_id(), vo.getQuantity());
        } else {
            mapper.insertCart(vo);
        }
    }

    public void updateQuantity(Long cart_id, int quantity) {
        mapper.updateQuantity(cart_id, quantity);
    }


    public void deleteCartItem(Long cart_id) {
        mapper.deleteCartItem(cart_id);
    }


    public void clearCart(String user_id) {
        mapper.deleteAllCartItems(user_id);
    }


    public boolean isCartItemExists(String user_id, String product_id) {
        return mapper.checkCartItem(user_id, product_id) > 0;
    }
}
