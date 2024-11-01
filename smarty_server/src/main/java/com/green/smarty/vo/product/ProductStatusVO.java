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
    private String statusId;
    private String productId;
    private String status;
    private LocalDateTime updatedAt;
}
