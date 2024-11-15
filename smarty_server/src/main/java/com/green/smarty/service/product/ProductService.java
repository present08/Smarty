package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductMapper;
import com.green.smarty.vo.product.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductStatusService productStatusService;

    public List<ProductVO> registerProduct(List<ProductVO> productList) {
        List<ProductVO> registeredProducts = new ArrayList<>();

        for (ProductVO product : productList) {
            String facilityId = product.getFacility_id();

            // 중복되지 않는 product_id 생성
            int index = 1;
            String productId;
            do {
                String baseId = facilityId.substring(facilityId.length() - 4) + String.format("%02d", index);
                productId = "p" + baseId;
                index++;
            } while (productMapper.existsByProductId(productId));  // 중복 ID가 없을 때까지 반복

            product.setProduct_id(productId);

            // 상품 등록
            productMapper.insertProduct(product);
            registeredProducts.add(product);

            // 상태 등록 서비스 호출 (product_id, 관리 방식, 수량, 사이즈)
            productStatusService.registerDefaultStatus(productId, product.getManagement_type(), product.getStock(), product.getSize());
        }
        return registeredProducts;
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
