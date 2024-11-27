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
        log.info("상태 ID: {} 변경된 상태 : {}" , statusId, newStatus);
        try {
            productStatusService.udpateProductStatus(statusId, newStatus);
            return ResponseEntity.ok("Product status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product status");
        }
    }

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

    @PutMapping("/update-status-with-stock")
    public ResponseEntity<String> updateStatusWithStock(
            @RequestParam("statusId") String statusId,
            @RequestParam("newStatus") String newStatus) {
        try {
            productStatusService.updateStatusAndStock(statusId, newStatus);
            log.info("상태 변경 및 재고 처리 완료 - statusId: {}, newStatus: {}", statusId, newStatus);
            return ResponseEntity.ok("Status and stock updated successfully.");
        } catch (IllegalArgumentException e) {
            log.warn("요청 처리 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.error("상태 및 재고 처리 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update status and stock.");
        }
    }

    @GetMapping("/status-counts/{productId}")
    public ResponseEntity<List<Map<String, Object>>> getStatusCountsByProductId(
            @PathVariable("productId") String productId) {
        try {
            List<Map<String, Object>> statusCounts = productStatusService.getStatusCountsByProductId(productId);
            return ResponseEntity.ok(statusCounts);
        } catch (Exception e) {
            log.error("상태별 수량 조회 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update-status-with-quantity")
    public ResponseEntity<String> updateStatusWithQuantity(
            @RequestParam("statusId") String statusId,
            @RequestParam("newStatus") String newStatus,
            @RequestParam("quantity") int quantity
    ) {
        try {
            productStatusService.updateStatusWithQuantity(statusId, newStatus, quantity);
            log.info("상태 및 수량 변경 완료 - statusId: {}, newStatus: {}, 변경 수량: {}", statusId, newStatus, quantity);
            return ResponseEntity.ok("Status and quantity updated successfully.");
        } catch (Exception e) {
            log.error("상태 및 수량 변경 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update status and quantity.");
        }
    }

}