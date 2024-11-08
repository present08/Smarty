package com.green.smarty.controller.product;

import com.green.smarty.service.product.QuantityService;
import com.green.smarty.vo.product.QuantityVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/product-quantities")
@CrossOrigin(origins = "http://localhost:3000")
public class QuantityController {

    @Autowired
    private QuantityService quantityService;

    @PostMapping("/{productId}")
    public void addQuantitiesToProduct(@PathVariable("productId") String productId, @RequestBody List<QuantityVO> quantities) {
        quantities.forEach(quantity -> {
            quantity.setProduct_id(productId);
            quantityService.registerQuantity(quantity);
        });
    }

    // GET 요청을 추가하여 특정 상품 ID에 대한 개별 수량 조회
    @GetMapping("/{productId}")
    public List<QuantityVO> getQuantitiesByProductId(@PathVariable("productId") String productId) {
        return quantityService.getQuantitiesByProductId(productId);  // 특정 상품의 재고 목록 반환
    }

    // 전체 재고량 수정
    @PutMapping("/set-stock/{quantityId}")
    public String setStock(@PathVariable("quantityId") String quantityId,
                           @RequestParam("stock") int stock) {
        int result = quantityService.setStock(quantityId, stock);
        System.out.println("Updated stock for quantity_id : " + quantityId + "to stock : " + stock);
        return result > 0 ? "전체 재고량이 성공적으로 수정되었습니다." : "전체 재고량 수정에 실패했습니다.";

    }

    // 재고량 추가/감소
    @PutMapping("/update-stock/{quantityId}")
    public String updateStock(@PathVariable("quantityId") String quantityId,
                              @RequestParam("quantity") int quantity,
                              @RequestParam("operationType") String operationType) {
        int result = quantityService.updateStock(quantityId, quantity, operationType);
        if (result > 0) {
            return "재고량이 성공적으로 업데이트되었습니다.";
        } else {
            return "재고량 업데이트에 실패했습니다.";
        }
    }

    // 전체 재고량 합산을 위한 엔드포인트
    @GetMapping("/total-stock")
    public List<QuantityVO> getTotalStockForAllProducts() {
        return quantityService.getTotalStockForAllProducts();
    }

    // 특정 상품의 개별 quantity_id 조회 엔드포인트
    @GetMapping("/details/{productId}")
    public List<QuantityVO> getDetailsByProductId(@PathVariable("productId") String productId) {
        return quantityService.getDetailsByProductId(productId);
    }

    @GetMapping("/details-with-size/{productId}")
    public List<Map<String, Object>> getDetailsWithSizeByProductId(@PathVariable("productId") String productId) {
        return quantityService.getDetailsWithSizeByProductId(productId);
    }
}
