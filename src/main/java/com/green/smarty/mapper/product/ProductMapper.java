package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    int register (ProductVO vo);
    int modify (ProductVO vo);
    void removeProduct(String prodcut_id);

    List<ProductVO> getAllProducts();

    ProductVO getProductById(String productId);

    List<ProductVO> getProductsByFacilityId(@Param("facilityId") String facilityId);

}
