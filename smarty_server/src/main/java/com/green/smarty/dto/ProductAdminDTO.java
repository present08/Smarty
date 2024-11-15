package com.green.smarty.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductAdminDTO {

    private String product_id;          // 상품 ID
    private String facility_id;         // 시설 ID
    private String product_name;        // 상품명
    private String management_type;     // 관리 방식 (일괄 관리, 사이즈별 관리 등)
    private int stock;                  // 수량
    private int price;                  // 가격
    private boolean product_images;     // 이미지 유무
    private List<String> size;          // 사이즈 리스트

    @JsonSetter("size")
    public void setSize(Object size) {
        if (size instanceof String && ((String) size).isEmpty()) {
            this.size = new ArrayList<>(); // 빈 문자열을 빈 배열로 변환
        } else if (size instanceof List) {
            this.size = (List<String>) size;
        } else {
            this.size = new ArrayList<>();
        }
    }

    public List<String> getSize() {
        return size;
    }
}