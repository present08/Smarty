package com.green.smarty.vo.product;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class QuantityVO {
    private String quantity_id;
    private String product_id;
    private String size_id;
    private int stock;
}
