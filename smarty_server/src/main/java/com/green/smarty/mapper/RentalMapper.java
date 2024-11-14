package com.green.smarty.mapper;

import com.green.smarty.vo.RentalVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface RentalMapper {
    int insertRental(RentalVO vo);
    List<RentalVO> getAllRentals();
    int returnRental(String rental_id);
    String findUserId(String user_id);
    String findProductId(String product_id);
    int updateRental(RentalVO vo);
    RentalVO getRentalById(String rental_id);
}
