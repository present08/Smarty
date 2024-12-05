package com.green.smarty.service;

import com.green.smarty.dto.UserCartListDTO;
import com.green.smarty.mapper.CartMapper;
import com.green.smarty.mapper.PaymentMapper;
import com.green.smarty.mapper.UserRentalMapper;
import com.green.smarty.vo.CartVO;
import com.green.smarty.vo.PaymentVO;
import com.green.smarty.vo.RentalVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class CartService {
    @Autowired
    private CartMapper cartMapper;
    @Autowired
    private UserRentalMapper userRentalMapper;
    @Autowired
    private PaymentMapper paymentMapper;

    public List<UserCartListDTO> getUserCart(String user_id) {
        return cartMapper.getUserCart(user_id);
    }

    public void addCart(CartVO cartVO) {
        cartMapper.addCart(cartVO);
    }

    public void updateCart(CartVO cartVO) {
        cartMapper.updateCart(cartVO);
    }

    public void removeCart(String cart_id) {
        cartMapper.removeCart(cart_id);
    }

    public void clearCart(String user_id) {
        cartMapper.clearCart(user_id);
    }


    public List<CartVO> getAllCart() {
        return cartMapper.getAllCart();
    }
}
