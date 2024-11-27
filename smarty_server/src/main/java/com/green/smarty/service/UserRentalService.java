package com.green.smarty.service;

import com.green.smarty.dto.ProductRentalMyPageUserDTO;
import com.green.smarty.dto.RentalDTO;
import com.green.smarty.mapper.UserProductMapper;
import com.green.smarty.mapper.UserRentalMapper;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.vo.ProductVO;
import com.green.smarty.vo.RentalVO;
import com.green.smarty.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor

public class UserRentalService{
    @Autowired
    private UserRentalMapper userRentalMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserProductMapper userProductMapper;

    public int insertRental(RentalVO vo) {

        log.info("대여 등록 시작: {}", vo);

        // 사용자 존재 여부 확인
        UserVO user = userMapper.getById(vo.getUser_id());
        if (user == null) {
            throw new RuntimeException("존재하지 않는 사용자입니다. ID: " + vo.getUser_id());
        }

        // 상품 존재 여부 확인
        ProductVO product = userProductMapper.getProductById(vo.getProduct_id());
        if (product == null) {
            throw new RuntimeException("존재하지 않는 상품입니다. ID: " + vo.getProduct_id());
        }

        // 대여 정보 등록
        return userRentalMapper.insertRental(vo);
    }


    public List<RentalDTO> getAllRentals() {
        List<RentalDTO> rentalList = userRentalMapper.getAllRentals();
        return rentalList;
    }


    public int returnRental(String rental_id) {
        System.out.println("반납할 렌탈 ID: "+rental_id);
        return userRentalMapper.returnRental(rental_id);
    }


    public RentalDTO getRentalById(String rental_id) {
        return userRentalMapper.getRentalById(rental_id);
    }


    public int updateRental(RentalDTO dto) {
        return userRentalMapper.updateRental(dto);
    }

}
