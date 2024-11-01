package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class AttendanceVO {
    private String attendance_id;
    private String reservation_id;
    private String enrollment_id;
    private enum status {PRESENT, LATE, ABSENT};
    private LocalDateTime checkin_date;
    private LocalDateTime checkout_date;
}
