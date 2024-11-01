package com.green.smarty.service.product;

import com.green.smarty.vo.product.ProductVO;

import java.util.List;

public interface ProductService {
    void addProduct(ProductVO product);
    void updateProduct(ProductVO product);
    void deleteProduct(String productId);
    List<ProductVO> getAllProducts();
    ProductVO getProductById(String productId);
    List<ProductVO> getProductsByFacilityId(String facilityId);
}
