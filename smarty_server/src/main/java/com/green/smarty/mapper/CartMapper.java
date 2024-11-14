package com.green.smarty.mapper;

import com.green.smarty.vo.CartVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper

public interface CartMapper {
    List<CartVO> selectCartList(String user_id);
    void insertCart(CartVO vo);
    void updateQuantity(@Param("cart_id") Long cart_id, @Param("quantity") int quantity);
    void deleteCartItem(Long cart_id);
    void deleteAllCartItems(String user_id);
    int checkCartItem(@Param("user_id") String user_id, @Param("product_id") String product_id);
}
