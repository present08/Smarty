package com.green.smarty.controller;

import com.green.smarty.service.AdminProductStatusService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/product-status")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j2
public class AdminProductStatusController {
    @Autowired
    private AdminProductStatusService productStatusService;

    @PostMapping("/register")
    public ResponseEntity<String> registerDefaultStatus(
            @RequestParam("productId") String productId,
            @RequestParam("managementType") String managementType,
            @RequestParam("stock") int stock,
            @RequestParam(value = "size", required = false) String size) {
        log.info("상태 등록 요청 - productId: {}, managementType: {}, stock: {}, size: {}", productId, managementType, stock, size);

        try {
            // 관리 방식에 따른 상태 등록
            productStatusService.registerDefaultStatus(productId, managementType, stock, size);
            return ResponseEntity.ok("Product status set to '대여 가능'.");
        } catch (Exception e) {
            log.error("Failed to set default product status for productId {}: {}", productId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to set default product status.");
        }
    }

    // 특정 facility_id의 모든 상품 상태 조회 엔드포인트
    @GetMapping("/{facilityId}")
    public ResponseEntity<List<Map<String, Object>>> getProductStatusByFacility(@PathVariable("facilityId") String facilityId){
        List<Map<String, Object>> productStatusList = productStatusService.getProductStatusByFacility(facilityId);
        return ResponseEntity.ok(productStatusList);
    }

    @PutMapping("/update-status")
    public ResponseEntity<String> updateProductStatus(@RequestParam("statusId") String statusId, @RequestParam("newStatus") String newStatus) {

        try {
            productStatusService.udpateProductStatus(statusId, newStatus);
            return ResponseEntity.ok("Product status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product status");
        }
    }

    @PutMapping("/update-stock")
    public ResponseEntity<String> updateProductStock(@RequestParam("productId") String productId, @RequestParam("newStock") int newStock) {

        try {
            productStatusService.udpateProductStock(productId, newStock);
            return ResponseEntity.ok("Product stock updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product stock");
        }
    }

}