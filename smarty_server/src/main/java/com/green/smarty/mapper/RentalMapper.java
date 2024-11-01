package com.green.smarty.mapper;

import com.green.smarty.vo.RentalVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RentalMapper {
    int register (RentalVO rentalVO);
    int modify (RentalVO rentalVO);
    void cancelRental(String rental_id);

    List<RentalVO> getAllRentals();

    List<RentalVO> getProductRentalStatus(@Param("facilityId") Long facilityId, @Param("date") String date);

    List<Map<String, Object>> getRentalsByUserId(@Param("userId") String userId);

}
