package com.green.smarty.vo.product;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class SizeVO {
    private String size_id;
    private String cloth_size;
    private String shoe_size;
    private String product_id;
}
