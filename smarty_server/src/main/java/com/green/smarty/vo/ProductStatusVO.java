package com.green.smarty.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductStatusVO {
    private String status_id;
    private String product_id;
    private String product_status;
    private LocalDateTime updated_at;
    private Integer quantity = 0; // 기본값 설정
}
