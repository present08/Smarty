package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductStatusVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductStatusMapper {
    List<ProductStatusVO> getAllProductStatuses(); // 전체 상품 상태 조회 메서드 추가
    void updateProductStatus(ProductStatusVO productStatus);
    List<ProductStatusVO> getProductStatus(@Param("productId") String productId);


}
