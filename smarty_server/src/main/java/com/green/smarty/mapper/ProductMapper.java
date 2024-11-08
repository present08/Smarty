package com.green.smarty.mapper;

import com.green.smarty.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface ProductMapper {
    Long register(ProductVO vo);
    List<ProductVO> getAllProducts();
    Long updateProduct(ProductVO vo);
    ProductVO getProductById(Long product_id);

    void deleteProduct(Long product_id);
}
