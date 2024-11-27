package com.green.smarty.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class PaymentDetailDTO {
    String reservation_id;
    String enrollment_id;
    float amount;
    String user_id;
    String product_id;
    int count;
}
