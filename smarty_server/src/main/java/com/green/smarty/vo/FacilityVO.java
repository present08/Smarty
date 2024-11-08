package com.green.smarty.vo;

import lombok.*;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class FacilityVO {
    private Long facility_id;
    private String facility_name;
    private int price;
    private double day_rate;
    private double night_rate;
    private LocalTime open_time;
    private LocalTime close_time;


}
