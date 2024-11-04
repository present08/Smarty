package com.green.smarty;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.green.smarty.mapper.ReservationMapper;
import com.green.smarty.vo.CourtVO;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;
import com.green.smarty.vo.UserVO;

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

	@Test
	public void insertUser(){
		UserVO vo = UserVO.builder()
			.user_id("kaka")
			.user_name("kaka")
			.email("kaka@kaka")
			.password("1234")
			.phone("010-1234-4567")
			.address("경기도 성남시")
			.birthday(LocalDate.of(2024, 1, 23))
			.join_date(LocalDateTime.now())
			.login_date(LocalDate.now())
			.user_status(true)
			.level("silver")
			.build();
		int result = reservationMapper.insertUser(vo);
		System.out.println(result);
	}

	@Test
	public void insertReservation(){
		ReservationVO vo = ReservationVO.builder()
			.reservation_id("R_"+1234)
			.reservation_start(LocalDateTime.of(2024, 11, 4, 9, 00, 00))
			.reservation_end(LocalDateTime.of(2024, 11, 4, 12, 00, 00))
			.court_id("C_1234")
			.build();
		int insert = reservationMapper.insertReservation(vo);
		System.out.println(insert);
	}

	@Test
	public void insert_court(){
		CourtVO vo = CourtVO.builder()
			.court_id("C_"+1234)
			.court_name("1번코트")
			.facility_id("fc_1730518212730")
			.court_status(true)
			.build();
		int result = reservationMapper.insertCourt(vo);
		System.out.println(result);
	}
}
