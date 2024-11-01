package com.green.smarty.util;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class ReservationSystem {

    // 운영 시간 내에 예약이 가능한지 확인하는 메서드
    public static boolean isWithinOperatingHours(LocalDateTime reservationStart, LocalDateTime reservationEnd, LocalTime openTime, LocalTime closeTime) {
        LocalTime reservationStartTime = reservationStart.toLocalTime(); // 예약 시작 시간
        LocalTime reservationEndTime = reservationEnd.toLocalTime(); // 예약 종료 시간

        // 예약 시작 시간과 종료 시간이 운영 시간 내에 있는지 확인
        return !reservationStartTime.isBefore(openTime) && !reservationEndTime.isAfter(closeTime);
    }
}
