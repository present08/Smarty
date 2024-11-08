package com.green.smarty.vo;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class ProductVO {
    private Long product_id;
    private Long facility_id;
    private String product_name;
    private int price;
    private String facility_name;
    private List<AttachFileDTO> attachFiles;
}
