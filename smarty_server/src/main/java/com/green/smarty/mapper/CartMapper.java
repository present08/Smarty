package com.green.smarty.mapper;

import com.green.smarty.vo.CartVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface CartMapper {
    List<CartVO> getUserCart(String user_id);
    void addCart(CartVO cartVO);
    void updateCart(CartVO cartVO);
    void removeCart(Long cart_id);
    void clearCart(String user_id);
}
