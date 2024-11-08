package com.green.smarty.service;

import com.green.smarty.vo.RentalVO;

import java.util.List;

public interface RentalService {
    Long register(RentalVO vo);
    List<RentalVO> getAllRentals();
    int returnRental(Long rental_id);
    boolean isUser(Long user_id);
    boolean isProduct(Long Product_id);
    int updateRental(RentalVO vo);
    RentalVO getRentalById(Long String);


}
