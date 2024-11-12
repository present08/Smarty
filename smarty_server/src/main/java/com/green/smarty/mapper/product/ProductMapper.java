package com.green.smarty.mapper.product;

import com.green.smarty.vo.product.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    int insertProduct (ProductVO vo);
    int modify (ProductVO vo);
    void removeProduct(String prodcut_id);

    List<ProductVO> getAllProducts();

    ProductVO getProductById(String productId);

    List<ProductVO> getProductsByFacilityId(@Param("facilityId") String facilityId);

    Integer findMaxMiddleIndex(String baseProductId);  // 중간 자리 최대 순번 조회 메서드
    Integer findMaxSuffix(String baseProductId);       // 끝자리 최대 순번 조회 메서드
    boolean existsByProductName(@Param("productName") String productName); // 상품명과 시설 ID로 존재 여부 확인
    boolean existsByProductId(@Param("productId") String productId); // 상품명과 시설 ID로 존재 여부 확인

}
