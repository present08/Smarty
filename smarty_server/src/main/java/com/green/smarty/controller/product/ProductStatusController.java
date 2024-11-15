/*
package com.green.smarty.controller.product;

import com.green.smarty.service.product.ProductStatusService;
import com.green.smarty.vo.product.ProductStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-status")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductStatusController {
    @Autowired
    private ProductStatusService productStatusService;

    @PostMapping("/register")
    public ResponseEntity<String> registerProductStatus(@RequestBody ProductStatusVO status) {
        productStatusService.registerProductStatus(status);
        return ResponseEntity.ok("Product status registered successfully.");
    }

    @GetMapping("/all")
    public List<ProductStatusVO> getAllProductStatuses() {
        return productStatusService.getAllProductStatuses();
    }

    @PutMapping
    public void updateProductStatus(@RequestParam("product_id") String productId, @RequestParam("status") String status) {
        ProductStatusVO productStatus = ProductStatusVO.builder()
                .product_id(productId)
                .product_status(status)
                .build();
        productStatusService.updateProductStatus(productStatus);
        System.out.println("Updated status for quantity_id: " + productId + " to status: " + status); // 추가된 로그

    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<ProductStatusVO>> getStatusByProductId(@PathVariable("productId") String productId) {
        List<ProductStatusVO> statuses = productStatusService.getStatusByProductId(productId);
        return ResponseEntity.ok(statuses);
    }
}
*/
