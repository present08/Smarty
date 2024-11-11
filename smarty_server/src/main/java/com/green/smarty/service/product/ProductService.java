package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductMapper;
import com.green.smarty.vo.product.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductMapper productMapper;

    public void addProduct(ProductVO product) {
        productMapper.register(product);
    }

    public void updateProduct(ProductVO product) {
        productMapper.modify(product);
    }

    public void deleteProduct(String productId) {
        productMapper.removeProduct(productId);
    }

    public List<ProductVO> getAllProducts() {
        return productMapper.getAllProducts();
    }

    public ProductVO getProductById(String productId) {
        return productMapper.getProductById(productId);
    }

    public List<ProductVO> getProductsByFacilityId(String facilityId) {
        return productMapper.getProductsByFacilityId(facilityId);
    }

}
