package com.green.smarty.mapper;

import com.green.smarty.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminProductMapper {
    int register(ProductVO productVO);
    void fileUpload(String product_id, String origin_path, String thumbnail_path, String file_name);
    List<ProductVO> getList();
    ProductVO read(int product_id);
}
