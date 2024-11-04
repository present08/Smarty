package com.green.smarty.mapper;

import com.green.smarty.dto.ProductDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {

    int register(ProductDTO productDTO);
    void fileUpload(int product_id, String origin_path, String thumbnail_path, String file_name);
    List<ProductDTO> getList();
    ProductDTO read(int product_id);
}
