package com.green.smarty.controller;

import com.green.smarty.dto.CartDTO;
import com.green.smarty.dto.UserCartListDTO;
import com.green.smarty.service.CartService;
import com.green.smarty.vo.CartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")

public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/{user_id}")
    public ResponseEntity<List<UserCartListDTO>> getCartItem(@PathVariable String user_id) {
        List<UserCartListDTO> cartItems = cartService.getUserCart(user_id);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping
    public ResponseEntity<String> addCartItem(@RequestBody CartDTO cartDTO) {
        System.out.println(cartDTO);

        LocalDateTime date = LocalDateTime.now();
        String formatDate = date.getYear()+String.format("%02d", date.getMonthValue())+String.format("%02d", date.getDayOfMonth());

        List<CartVO> allCart = cartService.getAllCart();
        List<CartVO> cartList = new ArrayList<>();

        for (CartVO item : allCart) {
            String cartDate = item.getCart_id().substring(2, 10);
            if (cartDate.equals(formatDate)) {
                cartList.add(item);
            }
        }

        String id = "C_" + formatDate + String.format("%03d", cartList.size()+1);
        System.out.println("Cart ID : " + id);

        CartVO cartVO = CartVO.builder()
                .cart_id(id)
                .user_id(cartDTO.getUser_id())
                .product_id(cartDTO.getProduct_id())
                .quantity(cartDTO.getQuantity())
                .created_at(LocalDateTime.now())
                .build();

        cartService.addCart(cartVO);

        return ResponseEntity.ok(id);
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
    public ResponseEntity<String> removeCartItem(@PathVariable String cart_id) {
        cartService.removeCart(cart_id);
        return ResponseEntity.ok("카트 아이디로 삭제");
    }

    @DeleteMapping("/clear/{user_id}")
    public ResponseEntity<String> clearCart(@PathVariable String user_id) {
        cartService.clearCart(user_id);
        return ResponseEntity.ok("장바구니 전부 비우기");
    }

}
