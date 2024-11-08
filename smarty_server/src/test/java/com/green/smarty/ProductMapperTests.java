package com.green.smarty;

import com.green.smarty.mapper.ProductMapper;
import com.green.smarty.vo.ProductVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest

public class ProductMapperTests {
    @Autowired
    private ProductMapper mapper;
    @Test
    public  void registerDummy() {
        String[] facilityNames = {"수영","헬스","골프","테니스","볼링","탁구"};

        for (int i = 0; i < 20; i++) {
            int facilityId = (int) (Math.random() * facilityNames.length)+1;
            String facilityName = facilityNames[facilityId-1];

            ProductVO vo = ProductVO.builder()
                    .facility_id((long)facilityId)
                    .product_name("테스트 상품"+i)
                    .price((int)(Math.random()*10000))
                    .facility_name(facilityName)
                    .build();
            mapper.register(vo);
        }
        System.out.println("테스트 데이터 등록");
    }

    @Test
    public void updateProduct() {
        ProductVO vo = new ProductVO();
        vo.setProduct_name("볼링화");
        vo.setProduct_id(20L);
        mapper.updateProduct(vo);
    }
}
