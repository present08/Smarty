package com.green.smarty.mapper;

import com.green.smarty.dto.ProductRentalMyPageUserDTO;
import com.green.smarty.dto.ProductRentalUserDTO;
import com.green.smarty.dto.RentalDTO;
import com.green.smarty.vo.RentalVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import java.util.List;
import java.util.Map;

@Mapper

public interface UserRentalMapper {
    //대여등록
    int insertRental(RentalVO vo);

    //모든 대여 조회
    List<RentalDTO> getAllRentals();

    //특정 대여 조회
    RentalDTO getRentalById(String rental_id);

    //상품 재고 감소
//    int productStockDown(@Param("product_id") String product_id, @Param("count") int count);
    int productStockDown(Map<String, Object> map);

    //상품 재고 증가
//    int productStockUp(@Param("product_id") String product_id, @Param("count") int count);
    int productStockUp(Map<String, Object> map);

    //대여 반납 처리
    int returnRental(RentalVO vo);

    //특정 사용자 대여 목록 조회
    List<ProductRentalUserDTO> getUserRentalListData(String user_id);

    // 대여 가능한 재고 확인
    int getAvailableStock(String product_id);

    // 대여 로그 추가
    void insertRentalLog(Map<String, Object> logData);

    // 대여 로그 삭제
    void deleteRentalLog(@Param("status_id") String status_id, @Param("count") int count);

}
