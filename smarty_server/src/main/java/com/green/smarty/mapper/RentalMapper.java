package com.green.smarty.mapper;

import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ProductVO;
import com.green.smarty.vo.RentalVO;
import lombok.extern.java.Log;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper

public interface RentalMapper {
    Long register(RentalVO vo);
    List<RentalVO> getAllRentals();
    int returnRental(Long rental_id);
    Long findUserId(Long user_id);
    Long findProductId(Long product_id);
    int updateRental(RentalVO vo);
    RentalVO getRentalById(Long rental_id);
}
