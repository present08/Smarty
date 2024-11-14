package com.green.smarty.vo;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class ProductVO {
    private String product_id;
    private String facility_id;
    private String product_name;
    private int price;
    private String facility_name;
    private boolean product_images;
    private int stock;
    private String size;
    private List<ProductAttachDTO> attachFiles;
}
