package com.green.smarty.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CartVO {
    private Long cart_id;
    private String user_id;
    private String product_id;
    private int quantity;
    private LocalDateTime create_at;
    private LocalDateTime updated_at;
}
