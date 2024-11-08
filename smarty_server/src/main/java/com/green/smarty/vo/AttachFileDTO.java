package com.green.smarty.vo;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class AttachFileDTO {
    private String uuid;
    private String uploadPath;
    private String fileName;
    private boolean image;
    private Long product_id;
}
