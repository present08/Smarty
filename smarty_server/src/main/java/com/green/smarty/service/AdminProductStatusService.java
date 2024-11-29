package com.green.smarty.service;

import com.green.smarty.mapper.AdminProductMapper;
import com.green.smarty.mapper.AdminProductStatusMapper;
import com.green.smarty.vo.ProductStatusVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@Log4j2
public class AdminProductStatusService {
    @Autowired
    private AdminProductStatusMapper productStatusMapper;
    @Autowired
    private AdminProductMapper productMapper;

    public void registerDefaultStatus(String productId, String managementType, int stock, String size) {
        log.info("상태 등록 - productId: {}, managementType: {}, stock: {}, size: {}", productId, managementType, stock, size);

        // productId에서 끝 4자리 추출
        String productBaseId = productId.substring(productId.length() - 4);

        switch (managementType) {
            case "개별 관리":
                for (int i = 0; i < stock; i++) {
                    ProductStatusVO status = new ProductStatusVO();
                    String statusIdBase = "ps_" + productBaseId + "Ind";
                    int suffixIndex = productStatusMapper.findMaxSuffix(statusIdBase) + 1;
                    String statusId = statusIdBase + String.format("%02d", suffixIndex);

                    while (isDuplicateStatusId(statusId)) {
                        suffixIndex = productStatusMapper.findMaxSuffix(statusIdBase) + 1;
                        statusId = statusIdBase + String.format("%02d", suffixIndex);
                    }

                    status.setStatus_id(statusId);
                    status.setProduct_id(productId);
                    status.setCurrent_status("대여 가능");
                    productStatusMapper.insertProductStatus(status);

                    log.info("등록된 개별 관리 상태: {}", status);
                }
                break;

            case "일괄 관리":
                ProductStatusVO bulkStatus = new ProductStatusVO();
                String bulkStatusIdBase = "ps_" + productBaseId + "Bulk";
                int bulkSuffixIndex = productStatusMapper.findMaxSuffix(bulkStatusIdBase) + 1;
                String bulkStatusId = bulkStatusIdBase + String.format("%02d", bulkSuffixIndex);

                while (isDuplicateStatusId(bulkStatusId)) {
                    bulkSuffixIndex = productStatusMapper.findMaxSuffix(bulkStatusIdBase) + 1;
                    bulkStatusId = bulkStatusIdBase + String.format("%02d", bulkSuffixIndex);
                }

                bulkStatus.setStatus_id(bulkStatusId);
                bulkStatus.setProduct_id(productId);
                bulkStatus.setCurrent_status("대여 가능");
                productStatusMapper.insertProductStatus(bulkStatus);

                log.info("등록된 일괄 관리 상태: {}", bulkStatus);
                break;

            case "사이즈별 관리":
                if (size != null && !size.isEmpty()) {
                    ProductStatusVO sizeStatus = new ProductStatusVO();
                    String sizeStatusIdBase = "ps_" + productBaseId + size;
                    int sizeSuffixIndex = productStatusMapper.findMaxSuffix(sizeStatusIdBase) + 1;
                    String sizeStatusId = sizeStatusIdBase + String.format("%02d", sizeSuffixIndex);

                    while (isDuplicateStatusId(sizeStatusId)) {
                        sizeSuffixIndex = productStatusMapper.findMaxSuffix(sizeStatusIdBase) + 1;
                        sizeStatusId = sizeStatusIdBase + String.format("%02d", sizeSuffixIndex);
                    }

                    sizeStatus.setStatus_id(sizeStatusId);
                    sizeStatus.setProduct_id(productId);
                    sizeStatus.setCurrent_status("대여 가능");
                    productStatusMapper.insertProductStatus(sizeStatus);

                    log.info("등록된 사이즈별 관리 상태: {}", sizeStatus);
                }
                break;

            default:
                throw new IllegalArgumentException("Invalid management type: " + managementType);
        }
    }

    private boolean isDuplicateStatusId(String statusId) {
        // 중복된 status_id가 있는지 확인하는 로직 (예: DB 조회)
        return productStatusMapper.existsByStatusId(statusId);
    }

    // 특정 facility_id의 모든 상품 상태 조회 메서드
    public List<Map<String, Object>> getProductStatusByFacility(String facilityId) {
        return productStatusMapper.findProductStatusByFacility(facilityId);
    }

    // 대여 상품 상태 수정
    public void changeStatus(String statusId, String changedStatus, int quantity) {
        Map<String, Object> statusInfo = productStatusMapper.getProductInfoByStatusId(statusId);

        String currentStatus = (String) statusInfo.get("current_status");
        if (!"대여 가능".equals(currentStatus)) {
            throw new IllegalArgumentException("현재 상태가 '대여 가능'이어야 변경 가능합니다.");
        }

        productStatusMapper.updateChangedStatus(statusId, changedStatus, quantity);
    }

    // 상태 복구 (변경된 상태 → 대여 가능)
    public void restoreToAvailable(String statusId) {
        Map<String, Object> statusInfo = productStatusMapper.getProductInfoByStatusId(statusId);

        String changedStatus = (String) statusInfo.get("changed_status");
        if (changedStatus == null) {
            throw new IllegalArgumentException("복구할 변경 상태가 없습니다.");
        }

        productStatusMapper.restoreToAvailable(statusId);
    }

    // 대여 상품 수량 수정
    public void updateProductStockAndUpdatedAt(String productId, int newStock) {
        // stock 업데이트
        productStatusMapper.updateProductStock(productId, newStock);

        // updated_at 업데이트
        productStatusMapper.updateProductStatusUpdatedAt(productId);

        log.info("상품 ID {}: stock={}, updated_at 갱신 완료", productId, newStock);
    }

    public List<Map<String, Object>> getStatusCountsByProductId(String productId) {
        return productStatusMapper.findStatusCountsByProductId(productId);
    }


}
