package com.green.smarty.dto;

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
public class ProductDTO {

    private int product_id;
    private String facility_id;
    private String product_name;
    private int price;
    private int quantity;
    private boolean product_images;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();
    @Builder.Default
    private List<String> file_name = new ArrayList<>();

    public void update(String product_name, int price, int quantity, boolean product_images) {
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
        this.product_images = product_images;
    }
}
