package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductStatusVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductStatusMapper {
    List<ProductStatusVO> getAllProductStatuses(); // 전체 상품 상태 조회 메서드 추가
    void updateProductStatus(ProductStatusVO productStatus);
    List<ProductStatusVO> getProductStatusByQuantityId(@Param("quantity_id") String quantityId); // 수정된 부분
    void insertProductStatus(@Param("status_id") String statusId,
                             @Param("quantity_id") String quantityId,
                             @Param("status") String status);
}
