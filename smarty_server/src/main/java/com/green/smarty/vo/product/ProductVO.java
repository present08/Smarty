package com.green.smarty.vo.product;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class ProductVO {
    private String product_id;
    private String facility_id;
    private String product_name;
    private int price;
}
