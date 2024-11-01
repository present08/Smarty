package com.green.smarty.vo.facility;

import lombok.*;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class FacilityVO {
    private String facility_id;
    private String facility_name;
    private double day_rate;
    private double night_rate;
    private LocalTime open_time;
    private LocalTime close_time;
}
