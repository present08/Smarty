package com.green.smarty;

import com.green.smarty.mapper.RentalMapper;
import com.green.smarty.vo.ProductVO;
import com.green.smarty.vo.RentalVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest

public class RentalMapperTests {

    @Autowired
    private RentalMapper mapper;


    @Test
    public void getRental() {
        List<RentalVO> rentalList = mapper.getAllRentals();
        System.out.println(rentalList);
    }


}
