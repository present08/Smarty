package com.green.smarty.controller;

import com.green.smarty.dto.CartDTO;
import com.green.smarty.service.CartService;
import com.green.smarty.vo.CartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")

public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/{user_id}")
    public List<CartVO> getCartItem(@PathVariable String user_id) {
        return cartService.getUserCart(user_id);
    }

    @PostMapping
    public ResponseEntity<String> addCartItem(@RequestBody CartDTO cartDTO) {
        CartVO cartVO = new CartVO();
        cartVO.setUser_id(cartDTO.getUser_id());
        cartVO.setProduct_id(cartDTO.getProduct_id());
        cartVO.setQuantity(cartDTO.getQuantity());
        cartService.addCart(cartVO);
        return ResponseEntity.ok("장바구니 생성");
    }

    @PutMapping
    public ResponseEntity<String> updateCartItem(@RequestBody CartDTO cartDTO) {
        CartVO cartVO = new CartVO();
        cartVO.setCart_id(cartDTO.getCart_id());
        cartVO.setQuantity(cartDTO.getQuantity());
        cartService.updateCart(cartVO);
        return ResponseEntity.ok("장바구니 업데이트");
    }

    @DeleteMapping("/{cart_id}")
    public ResponseEntity<String> removeCartItem(@PathVariable Long cart_id) {
        cartService.removeCart(cart_id);
        return ResponseEntity.ok("카트 아이디로 삭제");
    }

    @DeleteMapping("/clear/{user_Id}")
    public ResponseEntity<String> clearCart(@PathVariable String user_id) {
        cartService.clearCart(user_id);
        return ResponseEntity.ok("장바구니 전부 비우기");
    }
}
