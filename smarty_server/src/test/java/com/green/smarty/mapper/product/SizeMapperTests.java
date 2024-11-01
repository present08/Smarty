package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductVO;
import com.green.smarty.vo.product.SizeVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class SizeMapperTests {
    @Autowired
    private SizeMapper sizeMapper;
    @Autowired
    private ProductMapper productMapper;

    @Test
    public void dummySizeOfProductInsert(){
        List<ProductVO> products = productMapper.getAllProducts(); // 모든 상품 가져오기

        products.forEach(product -> {
            String productId = product.getProduct_id();
            String productName = product.getProduct_name();

            // 유니폼에 대한 사이즈 입력 (S, M, L, XL, XXL)
            if (productName.contains("유니폼")) {
                String[] uniformSizes = {"S", "M", "L", "XL", "XXL"};
                for (String size : uniformSizes) {
                    SizeVO uniformSize = SizeVO.builder()
                            .size_id(productId + size) // 유니폼 사이즈 ID
                            .cloth_size(size) // 현재 사이즈
                            .shoe_size(null) // 운동화 사이즈 없음
                            .product_id(productId)
                            .build();
                    sizeMapper.register(uniformSize); // 유니폼 사이즈 삽입
                }
            }

            // 운동화에 대한 사이즈 입력 (240, 250, 260, 270, 280)
            if (productName.contains("운동화")) {
                for (int shoeSize = 240; shoeSize <= 280; shoeSize += 10) {
                    SizeVO size = SizeVO.builder()
                            .size_id(productId + shoeSize) // 운동화 사이즈 ID
                            .cloth_size(null) // 의류 사이즈 없음
                            .shoe_size(String.valueOf(shoeSize)) // 현재 신발 사이즈
                            .product_id(productId)
                            .build();
                    sizeMapper.register(size); // 운동화 사이즈 삽입
                }
            }
        });
    }
}
