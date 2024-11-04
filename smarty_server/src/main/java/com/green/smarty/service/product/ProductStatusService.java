package com.green.smarty.service.product;

import com.green.smarty.vo.product.ProductStatusVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductStatusService {
    List<ProductStatusVO> getAllProductStatuses(); // 모든 상품 상태 조회
    void updateProductStatus(ProductStatusVO productStatus);
    List<ProductStatusVO> getProductStatus(@Param("productId") String productId);

}
