package com.green.smarty.mapper;

import com.green.smarty.dto.ProductAdminDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminProductMapper {
    int register(ProductAdminDTO productAdminDTO);
    void fileUpload(String product_id, String origin_path, String thumbnail_path, String file_name);
    List<ProductAdminDTO> getList();
    ProductAdminDTO read(int product_id);
}
