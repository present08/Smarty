package com.green.smarty;

import com.green.smarty.mapper.UserProductMapper;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ProductVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest

public class ProductTests {
    @Autowired
    private UserProductMapper userProductMapper;

    @Test
    public void insertProduct() {
        List<String> p_arr = Arrays.asList(new String[] { "모자", "상의", "하의", "신발", "장갑", "수건", "안경", "양말" });
        List<String> f_arr = Arrays.asList(new String[] { "fc_1731568880360", "fc_1731574984449" });
        List<String> s_arr = Arrays.asList(new String[] { "S", "M", "L", "XL", "XXL" });
        int cnt = 0;
        for (String i : f_arr) {
            for (String j : p_arr){
            String id = "p_"+ i.substring(12)+String.format("%03d",cnt+1);
            int randomIndex = (int)(Math.random()* s_arr.size());
            ProductVO vo = ProductVO.builder()
                    .product_id(id)
                    .facility_id(i)
                    .product_name(j)
                    .price((int)((Math.random()*1000))*10)
                    .size(s_arr.get(randomIndex))
                    .stock(50)
                    .build();
            int result = userProductMapper.insertProduct(vo);
            cnt++;
            System.out.println(result);
            }
        }
    }
}
