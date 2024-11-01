package com.green.smarty.service.product;

import com.green.smarty.vo.product.QuantityVO;

import java.util.List;

public interface QuantityService {
    // 새로운 재고 등록
    int registerQuantity(QuantityVO quantityVO);
    // 특정 제품의 모든 재고 조회
    List<QuantityVO> getQuantitiesByProductId(String productId);
    // 재고량 추가/감소
    int updateStock(String quantityId, int quantity, String operationType);
    // 전체 재고량 설정
    int setStock(String quantityId, int stock);
}
