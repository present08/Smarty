package com.green.smarty.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class CartVO {
    private Long cart_id;
    private String user_id;
    private String product_id;
    private String product_name;
    private int quantity;
    private int price;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

}
