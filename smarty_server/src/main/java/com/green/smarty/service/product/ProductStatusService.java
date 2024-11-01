package com.green.smarty.service.product;

import com.green.smarty.vo.product.ProductStatusVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductStatusService {
    void updateProductStatus(ProductStatusVO productStatus);
    List<ProductStatusVO> getProductStatus(@Param("productId") String productId);

}
