package com.green.smarty.controller.product;

import com.green.smarty.mapper.product.ProductStatusMapper;
import com.green.smarty.service.product.ProductStatusService;
import com.green.smarty.vo.product.ProductStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-status")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductStatusController {
    @Autowired
    private ProductStatusService productStatusService;

    @PutMapping
    public void updateProductStatus(@RequestParam("productId") String productId, @RequestParam("status") String status) {
        ProductStatusVO productStatus = ProductStatusVO.builder()
                .productId(productId)
                .status(status)
                .build();
        productStatusService.updateProductStatus(productStatus);
    }

    @GetMapping("/{productId}")
    public List<ProductStatusVO> getProductStatus(@PathVariable("productId") String productId) {
        return productStatusService.getProductStatus(productId);
    }
}
