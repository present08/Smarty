package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.SizeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SizeMapper {
    int register (SizeVO vo);
    int modify (SizeVO vo);
    void removeSize(String size_id);

    // 특정 상품의 사이즈 조회 메서드 추가
    List<SizeVO> getSizesByProductId(@Param("productId") String productId);

}
