package com.green.smarty.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductVO {

    private String product_id;
    private String facility_id;
    private String product_name;
    private int price;
    private String size;
    private int stock;
    private boolean product_images;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();
    @Builder.Default
    private List<String> file_name = new ArrayList<>();

    public void update(String product_name, int price, String size, int stock, boolean product_images) {
        this.product_name = product_name;
        this.price = price;
        this.size = size;
        this.stock = stock;
        this.product_images = product_images;
    }
}
