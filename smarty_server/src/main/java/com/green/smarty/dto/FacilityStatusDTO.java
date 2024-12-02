package com.green.smarty.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.green.smarty.vo.AttendanceVO;
import com.green.smarty.vo.EnrollmentVO;
import com.green.smarty.vo.ReservationVO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder
public class FacilityStatusDTO {

    //  예약 정보
    @Builder.Default
    private Map<String, List<ReservationVO>> allReservation = new HashMap<>();

    // 수강신청 정보
    @Builder.Default
    private Map<String, List<EnrollmentVO>> allEnrollment = new HashMap<>();

    // 출석 정보
    @Builder.Default
    private Map<String, List<AttendanceVO>> resAttendance = new HashMap<>();
    @Builder.Default
    private Map<String, List<AttendanceVO>> enrAttendance = new HashMap<>();
}
