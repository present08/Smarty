package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class RentalVO {
    private String rental_id;
    private String user_id;
    private String quantity_id;
    private LocalDateTime rental_date;
    private LocalDateTime return_date;
}
