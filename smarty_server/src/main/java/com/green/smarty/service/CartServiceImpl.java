package com.green.smarty.service;

import com.green.smarty.mapper.CartMapper;
import com.green.smarty.vo.CartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CartServiceImpl implements CartService{
    @Autowired
    private CartMapper mapper;

    @Override
    public List<CartVO> getCartList(Long user_id) {
        return mapper.selectCartList(user_id);
    }

    @Override
    public void addToCart(CartVO vo) {
        if (isCartItemExists(vo.getUser_id(),vo.getProduct_id())) {
            mapper.updateQuantity(vo.getCart_id(), vo.getQuantity());
        } else {
            mapper.insertCart(vo);
        }
    }

    @Override
    public void updateQuantity(Long cart_id, int quantity) {
        mapper.updateQuantity(cart_id, quantity);
    }

    @Override
    public void deleteCartItem(Long cart_id) {
        mapper.deleteCartItem(cart_id);
    }

    @Override
    public void clearCart(Long user_id) {
        mapper.deleteAllCartItems(user_id);
    }

    @Override
    public boolean isCartItemExists(Long user_id, Long product_id) {
        return mapper.checkCartItem(user_id, product_id) > 0;
    }
}
