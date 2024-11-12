package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductAttachVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductAttachMapper {
    // 첨부파일 등록
    void insertProductAttach(ProductAttachVO attach);

    // 특정 상품의 첨부파일 조회
    List<ProductAttachVO> selectAttachByProductId(@Param("productId") String productId);

}
