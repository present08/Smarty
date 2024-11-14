package com.green.smarty;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
			int result = reservationMapper.insertFacility(vo);
			cnt++;
			System.out.println(result);
		}
	}

	@Test
	public void insertUser() {
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
	public void insert_court() {
		String[] facility_id = {"fc_1730949353199",
				"fc_1730949353249",
				"fc_1730949353252",
				"fc_1730949353254",
				"fc_1730949353256"
				, };
		for (int i = 1; i < 3; i++) {
			for (int j = 0; j < facility_id.length; j++) {
				CourtVO vo = CourtVO.builder()
						.court_id("C_00000" + (i < 2 ? j : j + facility_id.length))
						.court_name(i + "번코트")
						.facility_id(facility_id[j])
						.court_status(true)
						.build();
				int result = reservationMapper.insertCourt(vo);
				System.out.println(result);
			}
		}
	}

	@Test
	public void insertReservation() {
		ReservationVO vo = ReservationVO.builder()
				.reservation_id("R_000000")
				.reservation_start(LocalDateTime.of(2024, 11, 7, 14, 00, 00))
				.reservation_end(LocalDateTime.of(2024, 11, 7, 16, 00, 00))
				.court_id("C_000000")
				.facility_id("fc_1730949353199")
				.build();
		reservationMapper.insertReservation(vo);
	}

	@Test
	public void createTimeBtn() {
		String court_id = "C_0";
		String facility_id = "fc_1730796733763";
		String date = "2024-11-06";
		Map<String, String> getReservation = new HashMap<>();
		getReservation.put("facility_id", facility_id);
		getReservation.put("court_id", court_id);

		FacilityVO f_vo = reservationMapper.getFacility(facility_id);
		List<ReservationVO> r_vo = reservationMapper.getReservation(getReservation);

		int start = Integer.parseInt(f_vo.getOpen_time().split(":")[0]);
		int end = Integer.parseInt(f_vo.getClose_time().split(":")[0]);
		int default_time = f_vo.getDefault_time();
		int cnt = 0;
		List<Integer> list = new ArrayList<>();
		for (ReservationVO vo : r_vo) {
			if (vo.getReservation_start().toLocalDate().toString().equals(date)) {
				int start1 = Integer.parseInt(vo.getReservation_start().toLocalTime().toString().split(":")[0]);
				int end1 = Integer.parseInt(vo.getReservation_end().toLocalTime().toString().split(":")[0]);

				for (int i = 0; i < end1 - start1; i++) {
					list.add(start1 + i);
				}
			}
		}
		System.out.println(list);
		List<Map<String, Integer>> timeBtn = new ArrayList<>();
		for (int i = 0; i < (end - start); i++) {
			Map<String, Integer> timeMap = new HashMap<>();
			timeMap.put("start", start + i);
			timeMap.put("end", start + i + 1);
			timeMap.put("id", cnt);
			timeMap.put("active", 0);
			if ((end - start) % default_time > (end - start) - i - 1 || list.contains(start + i)) {
				timeMap.put("disabled", 1);
			} else {
				timeMap.put("disabled", 0);
			}
			timeBtn.add(timeMap);
			if ((i + 1) % default_time == 0)
				cnt++;
		}
		System.out.println(timeBtn);
		System.out.println("========================================");
	}

	@Test
	public void test1() {
		// int a = Math.random();
		System.out.println((Math.round(Math.random() * 100000) / 1000) * 1000);
		System.out.println((int) (Math.random() * 3));
	}
}
