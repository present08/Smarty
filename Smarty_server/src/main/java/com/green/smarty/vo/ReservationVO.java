package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class ReservationVO {
    private String reservation_id;
    private String user_id;
    private String court_id;
    private LocalDateTime reservation_start;
    private LocalDateTime reservation_end;
    private String court_name;
    private String facility_id;
    private boolean court_status;
}
