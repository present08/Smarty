package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductVO;
import com.green.smarty.vo.product.QuantityVO;
import com.green.smarty.vo.product.SizeVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class QuantityMapperTests {
    @Autowired
    private QuantityMapper quantityMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private SizeMapper sizeMapper;

    @Test
    public void dummyQuantityInsert() {
        // 데이터베이스에서 모든 대여물품 가져오기
        List<ProductVO> products = productMapper.getAllProducts();

        products.forEach(product -> {
            String productId = product.getProduct_id();

            if (productId.contains("locker") || productId.contains("essential")) {
                // 사물함 및 필수품의 경우 개별 고유 ID 부여
                for (int i = 1; i <= 50; i++) {
                    String uniqueId = productId + "_item_" + i; // 고유 재고 ID
                    quantityMapper.register(new QuantityVO(
                            uniqueId,             // 고유 재고 ID
                            productId,            // 상품 ID
                            null,                 // 사이즈 없음
                            1                     // 각 사물함이나 필수품은 수량 1
                    ));
                }
            } else if (productId.contains("uniform") || productId.contains("shoes")) {
                // 유니폼 및 운동화는 사이즈별로 수량을 관리
                List<SizeVO> sizes = sizeMapper.getSizesByProductId(productId);
                sizes.forEach(size -> {
                    quantityMapper.register(new QuantityVO(
                            productId + "_" + size.getSize_id(), // 고유 재고 ID
                            productId, // 상품 ID
                            size.getSize_id(), // 사이즈 ID
                            50 // 수량 50개
                    ));
                });
            } else {
                // 기타 단순 상품 (수건 등)
                quantityMapper.register(new QuantityVO(
                        productId + "_no_size", // 고유 재고 ID
                        productId,
                        null, // 사이즈 없음
                        50 // 수량 50개
                ));
            }
        });
    }
}
