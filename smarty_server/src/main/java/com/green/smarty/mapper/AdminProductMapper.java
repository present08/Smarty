package com.green.smarty.mapper;

import com.green.smarty.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminProductMapper {
    void insertProduct(ProductVO vo);
    void fileUpload(@Param("product_id") String productId,
                    @Param("origin_path") String originPath,
                    @Param("thumbnail_path") String thumbnailPath,
                    @Param("file_name") String fileName);    List<ProductVO> getAllProducts();
    List<ProductVO> getProductsByFacilityId(@Param("facility_id") String facilityId);
    ProductVO getProductById(String product_id);
    boolean existsByProductId(String product_id);
}
