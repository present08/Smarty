package com.green.smarty.mapper;

import com.green.smarty.vo.AttachFileDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface AttachFileMapper {
    void insert(AttachFileDTO attachFileDTO);
    List<AttachFileDTO> findByProductId(Long product_id);
    void deleteByProductId(Long product_id);
}
