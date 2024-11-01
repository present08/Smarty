package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductStatusVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductStatusMapper {
    void updateProductStatus(ProductStatusVO productStatus);
    List<ProductStatusVO> getProductStatus(@Param("productId") String productId);

}
