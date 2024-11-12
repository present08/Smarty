package com.green.smarty.controller.product.admin;

import com.green.smarty.service.product.ProductStatusService;
import com.green.smarty.vo.product.ProductStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/product-status")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminProductStatusController {
    @Autowired
    private ProductStatusService productStatusService;

    @PostMapping("/register")
    public ResponseEntity<String> registerDefaultStatus(@RequestParam("productId") String productId) {
        try {
            productStatusService.registerDefaultStatus(productId);
            return ResponseEntity.ok("Product status set to '대여 가능'.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to set default product status.");
        }
    }

    @GetMapping("/all")
    public List<ProductStatusVO> getAllProductStatuses() {
        return productStatusService.getAllProductStatuses();
    }

    @PutMapping
    public void updateProductStatus(@RequestParam("product_id") String productId, @RequestParam("status") String status) {
        ProductStatusVO productStatus = ProductStatusVO.builder()
                .product_id(productId)
                .status(status)
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
