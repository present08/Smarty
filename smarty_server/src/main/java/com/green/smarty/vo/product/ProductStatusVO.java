package com.green.smarty.vo.product;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder
public class ProductStatusVO {
    private String status_id;
    private String product_id;
    private String product_status;
    private LocalDateTime updated_at;
}
