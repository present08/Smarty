package com.green.smarty.mapper;

import com.green.smarty.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface ProductMapper {
    int insertProduct(ProductVO vo);
    List<ProductVO> getAllProducts();
    String updateProduct(ProductVO vo);
    ProductVO getProductById(String product_id);

    void deleteProduct(String product_id);
}
