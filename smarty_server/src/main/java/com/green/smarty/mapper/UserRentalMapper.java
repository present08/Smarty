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
    // 대여 등록
    int insertRental(RentalVO vo);

    // 모든 대여 조회
    List<RentalDTO> getAllRentals();

    // 특정 대여 조회
    RentalDTO getRentalById(String rental_id);

    // 대여 가능한 status_id 조회
    List<String> getAvailableStatusIds(@Param("product_id") String productId, @Param("count") int count);

    // 대여된 status_id 조회 (반납 시 사용)
    List<String> getRentedStatusIds(@Param("product_id") String productId, @Param("count") int count);

    // 대여 상태 변경
    int updateChangedStatus(@Param("status_id") String statusId, @Param("changed_status") String changedStatus);

    // 대여 가능한 재고 확인
    int getAvailableStock(String product_id);

    // 대여 로그 추가 (rental_id 포함)
    int insertRentalLogWithRentalId(Map<String, Object> logData);

    // 대여 로그 삭제
    int deleteRentalLog(@Param("status_id") String statusId, @Param("count") int count);

    // 반납 상태 복구
    int restoreToAvailable(@Param("status_id") String statusId);

    // 특정 상품의 전체 재고 확인
    int getTotalStock(@Param("product_id") String productId);

    // 특정 상품의 대여 불가량 확인
    int getUnavailableStock(@Param("product_id") String productId);

    // 특정 사용자 대여 목록 조회
    List<ProductRentalUserDTO> getUserRentalListData(String userId);

    // 반납 처리
    int returnRental(RentalVO vo);
}
