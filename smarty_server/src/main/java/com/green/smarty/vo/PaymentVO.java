package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class PaymentVO {
    private String payment_id;
    private String reservation_id;
    private String enrollment_id;
    private String rental_id;
    private float amount;
    private LocalDate payment_date;
}
