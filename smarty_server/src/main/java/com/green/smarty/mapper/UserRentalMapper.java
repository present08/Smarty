package com.green.smarty.mapper;

import com.green.smarty.dto.ProductRentalMyPageUserDTO;
import com.green.smarty.dto.ProductRentalUserDTO;
import com.green.smarty.dto.RentalDTO;
import com.green.smarty.vo.RentalVO;
import org.apache.ibatis.annotations.Mapper;


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

    //  (영준) 기간 지난 사람 색출해서 알림을 보내기 위한 코드
    List<RentalDTO> getOverdueRentals();

    //  (영준) user_id가 아니라 이메일을 가져오기 위한 코드
    String getEmailByUserId(String user_id);

}
