package com.green.smarty;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.green.smarty.mapper.ReservationMapper;
import com.green.smarty.vo.FacilityVO;

@SpringBootTest
class SmartyApplicationTests {
	@Autowired
	private ReservationMapper reservationMapper;

	@Test
	public void insertFacility() {
		List<String> f_arr = Arrays.asList(new String[]{"수영장","농구장","축구장","야구장","체육관"});
		for(String i : f_arr){
			String id = "fc_" + System.currentTimeMillis();
			FacilityVO vo = FacilityVO.builder()
				.facility_id(id)
				.facility_name(i)
				.open_time("09:00:00")
				.close_time("18:00:00")
				.default_time(3)
				.basic_fee(3000)
				.extra_fee(5000)
				.contact("010-1234-5678")
				.info("안내사항")
				.caution("주의사항")
				.court(true)
				.product(false)
				.facility_status(true)
				.facility_images(false)
				.build();
				int result = reservationMapper.insertFacility(vo);
				System.out.println(result);
			}
	}

}
