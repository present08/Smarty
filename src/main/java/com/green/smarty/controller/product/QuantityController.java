package com.green.smarty.controller.product;

import com.green.smarty.mapper.product.QuantityMapper;
import com.green.smarty.vo.product.QuantityVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-quantities")
@CrossOrigin(origins = "http://localhost:3000")
public class QuantityController {
    @Autowired
    private QuantityMapper quantityMapper;

    @PostMapping("/{productId}")
    public void addQuantitiesToProduct(@PathVariable("productId") String productId, @RequestBody List<QuantityVO> quantities) {
        quantities.forEach(quantity -> {
            quantity.setProduct_id(productId);
            quantityMapper.register(quantity);
        });
    }

    // 전체 재고량 수정
    @PutMapping("/set-stock/{quantityId}")
    public String setStock(@PathVariable("quantityId") String quantityId,
                           @RequestParam("stock") int stock) {
        int result = quantityMapper.setStock(quantityId, stock);
        return result > 0 ? "전체 재고량이 성공적으로 수정되었습니다." : "전체 재고량 수정에 실패했습니다.";
    }

    // 재고량 추가/감소
    @PutMapping("/update-stock/{quantityId}")
    public String updateStock(@PathVariable("quantityId") String quantityId,
                              @RequestParam("quantity") int quantity,
                              @RequestParam("operationType") String operationType) {
        int result = quantityMapper.updateStock(quantityId, quantity, operationType);
        if (result > 0) {
            return "재고량이 성공적으로 업데이트되었습니다.";
        } else {
            return "재고량 업데이트에 실패했습니다.";
        }
    }
}
