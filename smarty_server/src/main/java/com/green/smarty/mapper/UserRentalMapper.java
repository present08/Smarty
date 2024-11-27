package com.green.smarty.mapper;

import com.green.smarty.dto.ProductRentalMyPageUserDTO;
import com.green.smarty.dto.RentalDTO;
import com.green.smarty.vo.RentalVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface UserRentalMapper {
    int insertRental(RentalVO vo);
    List<RentalDTO> getAllRentals();
    int returnRental(String rental_id);
    String findUserId(String user_id);
    String findProductId(String product_id);
    int updateRental(RentalDTO dto);
    RentalDTO getRentalById(String rental_id);


}
