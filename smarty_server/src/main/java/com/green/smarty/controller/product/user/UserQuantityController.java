package com.green.smarty.controller.product.user;

import com.green.smarty.service.product.QuantityService;
import com.green.smarty.vo.product.QuantityVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/product-quantities")
@CrossOrigin(origins = "http://localhost:3000")
public class UserQuantityController {
    @Autowired
    private QuantityService quantityService;
    // 특정 상품 ID에 대한 개별 수량 조회
    @GetMapping("/{productId}")
    public List<QuantityVO> getQuantitiesByProductId(@PathVariable("productId") String productId) {
        return quantityService.getQuantitiesByProductId(productId);  // 특정 상품의 재고 목록 반환
    }
    // 전체 재고량 합산
    @GetMapping("/total-stock")
    public List<QuantityVO> getTotalStockForAllProducts() {
        return quantityService.getTotalStockForAllProducts();
    }
    // 특정 상품의 개별 quantity_id 조회
    @GetMapping("/details/{productId}")
    public List<QuantityVO> getDetailsByProductId(@PathVariable("productId") String productId) {
        return quantityService.getDetailsByProductId(productId);
    }

    @GetMapping("/details-with-size/{productId}")
    public List<Map<String, Object>> getDetailsWithSizeByProductId(@PathVariable("productId") String productId) {
        return quantityService.getDetailsWithSizeByProductId(productId);
    }
}
