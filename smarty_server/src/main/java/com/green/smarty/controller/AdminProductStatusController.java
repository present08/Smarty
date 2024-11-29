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
    public ResponseEntity<List<Map<String, Object>>> getProductStatusByFacility(@PathVariable("facilityId") String facilityId) {
        try {
            List<Map<String, Object>> productStatusList = productStatusService.getProductStatusByFacility(facilityId);
            return ResponseEntity.ok(productStatusList);
        } catch (Exception e) {
            log.error("Failed to retrieve product status for facility {}: {}", facilityId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // 상태 변경 (대여 가능 → 변경된 상태)
    @PutMapping("/update-status")
    public ResponseEntity<String> updateProductStatus(
            @RequestParam("statusId") String statusId,
            @RequestParam("changedStatus") String changedStatus,
            @RequestParam("quantity") int quantity) {
        log.info("상태 변경 요청 - statusId: {}, changedStatus: {}, quantity: {}", statusId, changedStatus, quantity);

        try {
            productStatusService.changeStatus(statusId, changedStatus, quantity);
            return ResponseEntity.ok("Status updated successfully.");
        } catch (IllegalArgumentException e) {
            log.warn("Validation error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.error("Failed to update status for statusId {}: {}", statusId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update status.");
        }
    }

    // 상품 총량 변경
    @PutMapping("/update-stock")
    public ResponseEntity<String> updateProductStock(
            @RequestParam("productId") String productId,
            @RequestParam("newStock") int newStock) {
        try {
            productStatusService.updateProductStockAndUpdatedAt(productId, newStock);
            log.info("수량 변경 및 수정 시간 갱신 - product_id: {}, 변경된 수량: {}", productId, newStock);
            return ResponseEntity.ok("Product stock and updated_at updated successfully");
        } catch (Exception e) {
            log.error("상품 수량 변경 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update product stock and updated_at");
        }
    }

    // 상태 복구 (변경된 상태 → 대여 가능)
    @PutMapping("/restore-to-available")
    public ResponseEntity<String> restoreToAvailable(
            @RequestParam("statusId") String statusId) {
        log.info("상태 복구 요청 - statusId: {}", statusId);

        try {
            productStatusService.restoreToAvailable(statusId);
            return ResponseEntity.ok("Status restored to '대여 가능'.");
        } catch (Exception e) {
            log.error("Failed to restore status for statusId {}: {}", statusId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to restore status.");
        }
    }

    // 특정 Product 상태별 수량 조회
    @GetMapping("/status-counts/{productId}")
    public ResponseEntity<List<Map<String, Object>>> getStatusCountsByProductId(
            @PathVariable("productId") String productId) {
        try {
            List<Map<String, Object>> statusCounts = productStatusService.getStatusCountsByProductId(productId);
            return ResponseEntity.ok(statusCounts);
        } catch (Exception e) {
            log.error("{} 상태별 수량 조회 실패:  {}", productId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}