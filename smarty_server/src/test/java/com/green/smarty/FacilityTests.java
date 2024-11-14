package com.green.smarty;

import com.green.smarty.mapper.FacilityMapper;
import com.green.smarty.vo.FacilityVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest

public class FacilityTests {

    @Autowired
    private FacilityMapper facilityMapper;

    @Test
    public void insertFacility() {
        List<String> f_arr = Arrays.asList(new String[] { "수영장", "농구장", "축구장", "야구장", "체육관" });
        int cnt = 1;
        for (String i : f_arr) {
            String id = "fc_" + System.currentTimeMillis();
            FacilityVO vo = FacilityVO.builder()
                    .facility_id(id)
                    .facility_name(i)
                    .open_time("0" + (3 + cnt) + ":00:00")
                    .close_time(17 + cnt + ":00:00")
                    .default_time(1 + cnt)
                    .basic_fee((int) ((Math.round(Math.random() * 100000) / 1000) * 1000))
                    .rate_adjustment(0.1f)
                    .hot_time((int) (Math.random() * 3))
                    .contact("010-1234-5678")
                    .info("안내사항")
                    .caution("주의사항")
                    .court(true)
                    .product(false)
                    .facility_status(true)
                    .facility_images(false)
                    .build();
            int result = facilityMapper.insertFacility(vo);
            cnt++;
//            System.out.println(result);
        }
    }

}
