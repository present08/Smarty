package com.green.smarty;

import com.green.smarty.mapper.ProductMapper;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ProductVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@SpringBootTest

public class ProductTests {

    @Autowired
    private ProductMapper productMapper;

    @Test
    public void insertProduct() {
        List<String> f_arr = Arrays.asList(new String[]{"fc_1731550317027", "fc_1731550317058", "fc_1731550317065", "fc_1731550317070", "fc_1731550317074"});
        List<String> p_arr = Arrays.asList(new String[]{"물품1", "물품2", "물품3", "물품4", "물품5", "물품6", "물품7", "물품8", "물품9", "물품10"});
        List<String> s_arr = Arrays.asList(new String[] {"S", "M", "L", "XL", "230", "240", "250", "260", "270", "280"});
        Random random = new Random();
        int cnt = 0;
        System.out.println();
        for (String i : f_arr) {
            System.out.println( i.substring(12));
            for (String j : p_arr) {
                String id = "P_" + i.substring(12) + String.format("%02d",cnt);
                String randomS_arr = s_arr.get(random.nextInt(s_arr.size()));
                ProductVO vo = ProductVO.builder()
                        .product_id(id)
                        .facility_id(i)
                        .product_name(j)
                        .stock(50)
                        .size(randomS_arr)
                        .price((int) (Math.round(Math.random() * 10000) / 100) *1000)
                        .build();
                int result = productMapper.insertProduct(vo);
                cnt++;
            }
        }
    }
}
