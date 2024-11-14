package com.green.smarty.service;

import com.green.smarty.mapper.ProductMapper;
import com.green.smarty.mapper.RentalMapper;
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

public class RentalService{
    @Autowired
    private RentalMapper rentalMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ProductMapper productMapper;

    public int insertRental(RentalVO vo) {

        log.info("대여 등록 시작: {}", vo);

        // 사용자 존재 여부 확인
        UserVO user = userMapper.getById(vo.getUser_id());
        if (user == null) {
            throw new RuntimeException("존재하지 않는 사용자입니다. ID: " + vo.getUser_id());
        }

        // 상품 존재 여부 확인
        ProductVO product = productMapper.getProductById(vo.getProduct_id());
        if (product == null) {
            throw new RuntimeException("존재하지 않는 상품입니다. ID: " + vo.getProduct_id());
        }

        // 대여 정보 등록
        return rentalMapper.insertRental(vo);
    }


    public List<RentalVO> getAllRentals() {
        List<RentalVO> rentalList = rentalMapper.getAllRentals();
        return rentalList;
    }


    public int returnRental(String rental_id) {
        System.out.println("반납할 렌탈 ID: "+rental_id);
        return rentalMapper.returnRental(rental_id);
    }


    public RentalVO getRentalById(String rental_id) {
        return rentalMapper.getRentalById(rental_id);
    }


//    public boolean isUser(String user_id) {
//        try {
//            return rentalMapper.findUserId(user_id) > 0;
//        } catch (Exception e) {
//            System.err.println("Error checking user existence: " + e.getMessage());
//            return false;
//        }
//    }

//    public boolean isProduct(String product_id) {
//        try {
//            return rentalMapper.findProductId(product_id) > 0;
//        } catch (Exception e) {
//            System.err.println("Error checking product existence: " + e.getMessage());
//            return false;
//        }
//    }

    public int updateRental(RentalVO vo) {
        return rentalMapper.updateRental(vo);
    }


}
