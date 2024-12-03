package com.green.smarty.service;

import com.green.smarty.mapper.CartMapper;
import com.green.smarty.vo.CartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CartService {
    @Autowired
    private CartMapper cartMapper;

    public List<CartVO> getUserCart(String user_id) {
        return cartMapper.getUserCart(user_id);
    }

    public void addCart(CartVO cartVO) {
        cartMapper.addCart(cartVO);
    }

    public void updateCart(CartVO cartVO) {
        cartMapper.updateCart(cartVO);
    }

    public void removeCart(Long cart_id) {
        cartMapper.removeCart(cart_id);
    }

    public void clearCart(String user_id) {
        cartMapper.clearCart(user_id);
    }
}
