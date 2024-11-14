package com.green.smarty.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class RentalVO {
    private String rental_id;
    private String user_id;
    private String product_id;

    //JOIN으로 가져올 데이터
    private String product_name;
    private String size;
    private int price;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime rental_date;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime return_date;

    private List<ProductAttachDTO> attachFiles;
}
