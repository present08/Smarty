package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class ClassVO {
    private String class_id;
    private String facility_id;
    private String class_name;
    private LocalDate start_date;
    private LocalDate end_date;
    private String day;
    private LocalTime start_time;
    private LocalTime end_time;
    private int price;
}
