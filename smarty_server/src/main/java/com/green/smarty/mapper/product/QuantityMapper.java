package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.QuantityVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface QuantityMapper {
    int register (QuantityVO vo);
    int modify (QuantityVO vo);
    // 모든 상품의 재고 조회
    List<QuantityVO> getAllQuantities();
    // 특정 상품의 재고 조회
    List<QuantityVO> getQuantitiesByProductId(@Param("productId") String productId);
    // 재고량 직접 설정
    int setStock(@Param("quantity_id") String quantityId, @Param("stock") int stock);
    // 재고량 업데이트
    int updateStock(@Param("quantity_id") String quantityId, @Param("quantity") int quantity, @Param("operation_type") String operationType);

    List<QuantityVO> getTotalStockForAllProducts();

    List<QuantityVO> getDetailsByProductId(String productId);

    List<Map<String, Object>> getDetailsWithSizeByProductId(String productId); // 새로운 메서드
}
