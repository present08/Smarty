package com.green.smarty.mapper;

import com.green.smarty.vo.ProductAttachDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface ProductAttachMapper {
    void insert(ProductAttachDTO productAttachDTO);
    List<ProductAttachDTO> findByProductId(String product_id);
    void deleteByProductId(String product_id);
}
