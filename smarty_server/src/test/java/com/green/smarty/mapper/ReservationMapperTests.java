package com.green.smarty.mapper;

import com.green.smarty.mapper.facility.CourtMapper;
import com.green.smarty.mapper.facility.FacilityMapper;
import com.green.smarty.mapper.user.UserMapper;
import com.green.smarty.util.ReservationSystem;
import com.green.smarty.vo.facility.CourtVO;
import com.green.smarty.vo.facility.FacilityVO;
import com.green.smarty.vo.ReservationVO;
import com.green.smarty.vo.user.UserVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.IntStream;

@SpringBootTest
public class ReservationMapperTests {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private FacilityMapper facilityMapper;
    @Autowired
    private ReservationMapper reservationMapper;
    @Autowired
    private CourtMapper courtMapper;

    @Test
    public void dummyResrvationInsert() {
        List<UserVO> userList = userMapper.getAllUsers();  // 전체 유저 리스트 가져오기
        List<String> facilityIds = facilityMapper.getAllFacilityIds();  // 모든 시설 ID 가져오기

        Random random = new Random();

        IntStream.rangeClosed(1, 100).forEach(i -> {
            UserVO randomUser = userList.get(random.nextInt(userList.size()));

            // 랜덤 시설 ID 선택
            String randomFacilityId = facilityIds.get(random.nextInt(facilityIds.size()));

            // 시설 운영 시간을 가져오기
            FacilityVO facility = facilityMapper.getOperatingHours(randomFacilityId);

            // 시설이 존재하는지 확인
            if (facility == null) {
                System.err.println("시설이 존재하지 않습니다: " + randomFacilityId);
                return; // 유효하지 않은 시설 ID로 인해 다음 반복으로 넘어갑니다.
            }

            LocalTime facilityOpenTime = facility.getOpen_time(); // 운영 시작 시간
            LocalTime facilityCloseTime = facility.getClose_time(); // 운영 종료 시간

            // 예약 날짜 생성
            LocalDate reservationDate = LocalDate.now();
            LocalDate selectedDate = LocalDate.of(2024, 11, 8);

            // 유효한 예약 시간을 찾기 위한 최대 시도 횟수 설정
            int maxAttempts = 10;
            int attempts = 0;

            boolean isValidReservation = false;
            LocalDateTime reservationStart = null;
            LocalDateTime reservationEnd = null;

            while (!isValidReservation && attempts < maxAttempts) {
                attempts++;

                // 운영 시간 내에서 랜덤한 2시간 단위 시작 시간 생성
                LocalTime randomStartTime = getRandomTimeInRange(facilityOpenTime, facilityCloseTime, random);
                reservationStart = LocalDateTime.of(selectedDate, randomStartTime); // 예약 시작 시간
                reservationEnd = reservationStart.plusHours(2); // 예약 종료 시간

                // 운영 시간 내에 예약이 가능한지 확인
                if (ReservationSystem.isWithinOperatingHours(reservationStart, reservationEnd, facilityOpenTime, facilityCloseTime)) {
                    // 코트 정보 가져오기
                    List<CourtVO> courts = courtMapper.getCourtsByFacilityId(randomFacilityId); // 코트 정보 가져오기

                    // 예약 가능한 코트 확인
                    for (CourtVO court : courts) {
                        if (isCourtAvailable(court.getCourt_id(), reservationStart, reservationEnd, facility)) {
                            // UUID로 고유한 예약 ID 생성
                            String reservationId = UUID.randomUUID().toString();

                            // ReservationVO 생성
                            ReservationVO reservation = new ReservationVO(
                                    reservationId,
                                    randomUser.getUser_id(),
                                    court.getCourt_id(),
                                    reservationStart,
                                    reservationEnd
                            );
                            try {
                                reservationMapper.register(reservation);
                                isValidReservation = true; // 유효한 예약 확인
                                break; // 예약 성공, 반복 종료
                            } catch (Exception e) {
                                System.err.println("Error inserting reservation: " + e.getMessage());
                            }
                        }
                    }
                }

                // 예약 가능한 시간대를 찾지 못한 경우
                if (attempts >= maxAttempts) {
                    System.err.println("예약 가능한 시간이 없습니다. 시도 횟수 초과.");
                    break;
                }
            }
        });
    }

    // 특정 코트에 대해 예약 가능한지 확인
    private boolean isCourtAvailable(String courtId, LocalDateTime start, LocalDateTime end, FacilityVO facility) {
        // 해당 코트의 기존 예약 조회
        List<ReservationVO> existingReservations = reservationMapper.getReservationsByCourtIdAndTime(courtId, start, end);

        // 예약 가능 여부 확인
        for (ReservationVO reservation : existingReservations) {
            // 날짜와 시간을 비교하여 시간이 겹치는지 확인
            if (reservation.getReservation_start().toLocalDate().equals(start.toLocalDate())) {
                // 같은 날짜일 때만 시간을 비교하여 충돌 여부 확인
                if (reservation.getReservation_start().isBefore(end) && reservation.getReservation_end().isAfter(start)) {
                    return false; // 시간이 겹치는 예약이 존재함
                }
            }
        }

        return true; // 기존 예약이 없다면 예약 가능
    }

    private LocalTime getRandomTimeInRange(LocalTime startBound, LocalTime endBound, Random random) {
        // 시작 시간과 종료 시간 사이의 총 가능한 시작 시간 수 계산
        int totalHours = (int) java.time.Duration.between(startBound, endBound).toHours();

        // 2시간 단위로 랜덤한 시간 선택
        int randomHour = random.nextInt(totalHours / 2 + 1) * 2;

        // 랜덤한 시간에 시작 시간 더하기
        return startBound.plusHours(randomHour);
    }
}