package com.green.smarty;

import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.mapper.UserReservationMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Random;

@SpringBootTest
public class DummyTests {

    @Autowired
    private UserReservationMapper reservationMapper;

    @Test
    public void insertDummyReservations() {
        List<String> userIds = List.of("choi", "jo", "kim", "kim2", "kim3", "ysh");
        List<String> courtIds = List.of("C_001701", "C_168001", "C_288001", "C_764601");
        Map<String, String> courtFacilityMap = Map.of(
                "C_001701", "FC_1734172080017", // 농구장
                "C_168001", "FC_1734171651680", // 수영장
                "C_288001", "FC_1734172202880", // 풋살장
                "C_764601", "FC_1734171977646"  // 헬스장
        );

        LocalDate startDate = LocalDate.of(2024, 12, 1);
        LocalDate endDate = LocalDate.now();
        Random random = new Random();
        int reservationCount = 0;

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            // 각 날짜에 대해 1~10회 랜덤 예약 생성
            int dailyReservations = random.nextInt(10) + 1; // 1 ~ 10회
            for (int i = 0; i < dailyReservations; i++) {
                String userId = userIds.get(random.nextInt(userIds.size()));
                String courtId = courtIds.get(random.nextInt(courtIds.size()));
                String facilityId = courtFacilityMap.get(courtId);

                // 예약 시작 시간 랜덤 생성 (운영 시간 9시 ~ 18시)
                int startHour = random.nextInt(9) + 9; // 9~18시
                LocalTime startTime = LocalTime.of(startHour, 0);
                LocalTime endTime = startTime.plusHours(1); // 기본 예약 시간: 1시간

                LocalDateTime reservationStart = LocalDateTime.of(date, startTime);
                LocalDateTime reservationEnd = LocalDateTime.of(date, endTime);

                // ReservationDTO 생성
                ReservationDTO reservation = ReservationDTO.builder()
                        .reservation_id("R_" + date.toString().replace("-", "") + String.format("%03d", ++reservationCount))
                        .user_id(userId)
                        .facility_id(facilityId)
                        .court_id(courtId)
                        .reservation_start(reservationStart)
                        .reservation_end(reservationEnd)
                        .build();

                // 데이터베이스 삽입
                try {
                    reservationMapper.insertReservation(reservation);
                    System.out.println("Inserted reservation: " + reservation);
                } catch (Exception e) {
                    System.err.println("Failed to insert reservation: " + reservation);
                    e.printStackTrace();
                }
            }
        }
    }
}
