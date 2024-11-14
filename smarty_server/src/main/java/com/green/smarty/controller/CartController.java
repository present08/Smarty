package com.green.smarty.controller;

import com.green.smarty.service.CartService;
import com.green.smarty.vo.CartVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")

public class CartController {
    @Autowired
    private CartService service;

    @GetMapping("/{user_id}")
    public ResponseEntity<List<CartVO>> getCartList(@PathVariable String user_id) {
        return ResponseEntity.ok(service.getCartList(user_id));
    }

    // 장바구니 담기
    @PostMapping
    public ResponseEntity<Void> addToCart(@RequestBody CartVO cart) {
        service.addToCart(cart);
        return ResponseEntity.ok().build();
    }

    // 수량 수정
    @PutMapping("/{cart_id}")
    public ResponseEntity<Void> updateQuantity(
            @PathVariable Long cart_id,
            @RequestParam int quantity) {
        service.updateQuantity(cart_id, quantity);
        return ResponseEntity.ok().build();
    }

    // 장바구니 상품 삭제
    @DeleteMapping("/{cart_id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cart_id) {
        service.deleteCartItem(cart_id);
        return ResponseEntity.ok().build();
    }

    // 장바구니 비우기
    @DeleteMapping("/clear/{user_id}")
    public ResponseEntity<Void> clearCart(@PathVariable String user_id) {
        service.clearCart(user_id);
        return ResponseEntity.ok().build();
    }

}
