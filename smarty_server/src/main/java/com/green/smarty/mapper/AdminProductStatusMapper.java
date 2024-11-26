package com.green.smarty.mapper;

import com.green.smarty.vo.ProductStatusVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminProductStatusMapper {
    // 특정 facility_id의 상품 상태 조회 메서드
    List<Map<String, Object>> findProductStatusByFacility(@Param("facilityId") String facilityId);

    // 상품 상태 등록 메서드
    void insertProductStatus(ProductStatusVO status);

    // 특정 ID에 대한 최대 suffix 값 조회 메서드
    int findMaxSuffix(@Param("baseId") String baseId);

    // 중복된 status_id 존재 여부 확인 메서드 - 파라미터 이름 일치
    boolean existsByStatusId(@Param("status_id") String status_id);
    // 대여상품 상태 수정
    void updateProductStatus(@Param("status_id") String statusId, @Param("product_status") String productStatus);
    // 대여상품 수량 수정
    void updateProductStock(@Param("product_id") String productId, @Param("stock") int newStock);


}