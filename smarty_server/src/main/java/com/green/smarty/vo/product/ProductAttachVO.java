package com.green.smarty.vo.product;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductAttachVO {
    private String product_id;
    private String origin_path;
    private String thumbnail_path;
    private String file_name;
}
