package com.green.smarty.controller.product.admin;

import com.green.smarty.service.product.ProductStatusService;
import com.green.smarty.vo.product.ProductStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/product-status")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminProductStatusController {
    @Autowired
    private ProductStatusService productStatusService;

    @GetMapping("/all")
    public List<ProductStatusVO> getAllProductStatuses() {
        return productStatusService.getAllProductStatuses();
    }

    @PutMapping
    public void updateProductStatus(@RequestParam("quantity_id") String quantityId, @RequestParam("status") String status) {
        ProductStatusVO productStatus = ProductStatusVO.builder()
                .quantity_id(quantityId)
                .status(status)
                .build();
        productStatusService.updateProductStatus(productStatus);
        System.out.println("Updated status for quantity_id: " + quantityId + " to status: " + status);
    }

    @GetMapping("/quantity/{quantity_id}")
    public ProductStatusVO getProductStatusByQuantityId(@PathVariable("quantity_id") String quantityId) {
        ProductStatusVO status = productStatusService.getProductStatusByQuantityId(quantityId).stream().findFirst().orElse(null);
        if (status == null) {
            System.out.println("No status found for quantity_id: " + quantityId);
        }
        return status;    }
}
