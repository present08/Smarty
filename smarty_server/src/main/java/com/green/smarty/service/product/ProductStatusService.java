package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductStatusMapper;
import com.green.smarty.vo.product.ProductStatusVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class ProductStatusService {
    @Autowired
    private ProductStatusMapper productStatusMapper;

    public void registerDefaultStatus(String productId, String managementType, int stock, String size) {
        // productId에서 끝 4자리 추출
        String productBaseId = productId.substring(productId.length() - 4);

        switch (managementType) {
            case "개별 관리":
                for (int i = 0; i < stock; i++) {
                    ProductStatusVO status = new ProductStatusVO();
                    // status_id 생성 - 형식: ps끝4자리IndXX
                    String statusIdBase = "ps_" + productBaseId + "Ind";
                    int suffixIndex = productStatusMapper.findMaxSuffix(statusIdBase) + 1;
                    String statusId = statusIdBase + String.format("%02d", suffixIndex);

                    // 중복 검사 및 업데이트
                    while (isDuplicateStatusId(statusId)) {
                        suffixIndex = productStatusMapper.findMaxSuffix(statusIdBase) + 1;
                        statusId = statusIdBase + String.format("%02d", suffixIndex);
                    }

                    status.setStatus_id(statusId);
                    status.setProduct_id(productId);
                    status.setProduct_status("대여 가능");
                    productStatusMapper.insertProductStatus(status);

                    System.out.println("Registered individual status with status_id = " + status.getStatus_id());
                }
                break;

            case "일괄 관리":
                ProductStatusVO bulkStatus = new ProductStatusVO();
                // status_id 생성 - 형식: ps끝4자리BulkXX
                String bulkStatusIdBase = "ps_" + productBaseId + "Bulk";
                int bulkSuffixIndex = productStatusMapper.findMaxSuffix(bulkStatusIdBase) + 1;
                String bulkStatusId = bulkStatusIdBase + String.format("%02d", bulkSuffixIndex);

                while (isDuplicateStatusId(bulkStatusId)) {
                    bulkSuffixIndex = productStatusMapper.findMaxSuffix(bulkStatusIdBase) + 1;
                    bulkStatusId = bulkStatusIdBase + String.format("%02d", bulkSuffixIndex);
                }

                bulkStatus.setStatus_id(bulkStatusId);
                bulkStatus.setProduct_id(productId);
                bulkStatus.setProduct_status("대여 가능");
                productStatusMapper.insertProductStatus(bulkStatus);

                System.out.println("Registered bulk status with status_id = " + bulkStatus.getStatus_id());
                break;

            case "사이즈별 관리":
                if (size != null && !size.isEmpty()) {
                    String[] sizes = size.split(",");
                    for (String sz : sizes) {
                        sz = sz.trim().toUpperCase();
                        ProductStatusVO sizeStatus = new ProductStatusVO();
                        // status_id 생성 - 형식: ps끝4자리SizeXX
                        String sizeStatusIdBase = "ps_" + productBaseId + sz;
                        int sizeSuffixIndex = productStatusMapper.findMaxSuffix(sizeStatusIdBase) + 1;
                        String sizeStatusId = sizeStatusIdBase + String.format("%02d", sizeSuffixIndex);

                        while (isDuplicateStatusId(sizeStatusId)) {
                            sizeSuffixIndex = productStatusMapper.findMaxSuffix(sizeStatusIdBase) + 1;
                            sizeStatusId = sizeStatusIdBase + String.format("%02d", sizeSuffixIndex);
                        }

                        sizeStatus.setStatus_id(sizeStatusId);
                        sizeStatus.setProduct_id(productId);
                        sizeStatus.setProduct_status("대여 가능");
                        productStatusMapper.insertProductStatus(sizeStatus);

                        System.out.println("Registered size status with status_id = " + sizeStatus.getStatus_id());
                    }
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
    public void udpateProductStatus(String statusId, String newStatus) {
        productStatusMapper.updateProductStatus(statusId, newStatus);
    }
    // 대여 상품 수량 수정
    public void udpateProductStock(String productId, int newStock){
        productStatusMapper.updateProductStock(productId, newStock);
    }

}
