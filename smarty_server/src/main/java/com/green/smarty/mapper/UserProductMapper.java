package com.green.smarty.mapper;

import com.green.smarty.dto.ProductDTO;
import com.green.smarty.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface UserProductMapper {
    int insertProduct(ProductVO vo);
    List<ProductVO> getAllProducts();
    String updateProduct(ProductVO vo);
    ProductVO getProductById(String product_id);
    List<ProductDTO> getProductsByFacilityId(String facility_id);

    void deleteProduct(String product_id);
}
