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

public class RentalServiceImpl implements RentalService{
    @Autowired
    private RentalMapper mapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ProductMapper productMapper;

    @Override
    public Long register(RentalVO vo) {
        log.info("대여 등록 시작: {}", vo);

        // 사용자 존재 여부 확인
        UserVO user = userMapper.getUserById(vo.getUser_id());
        if (user == null) {
            throw new RuntimeException("존재하지 않는 사용자입니다. ID: " + vo.getUser_id());
        }

        // 상품 존재 여부 확인
        ProductVO product = productMapper.getProductById(vo.getProduct_id());
        if (product == null) {
            throw new RuntimeException("존재하지 않는 상품입니다. ID: " + vo.getProduct_id());
        }

        // 대여 정보 등록
        return mapper.register(vo);
    }

    @Override
    public List<RentalVO> getAllRentals() {
        List<RentalVO> rentalList = mapper.getAllRentals();
        return rentalList;
    }

    @Override
    public int returnRental(Long rental_id) {
        System.out.println("반납할 렌탈 ID: "+rental_id);
        return mapper.returnRental(rental_id);
    }

    @Override
    public RentalVO getRentalById(Long rental_id) {
        return mapper.getRentalById(rental_id);
    }

    @Override
    public boolean isUser(Long user_id) {
        try {
            return mapper.findUserId(user_id) > 0;
        } catch (Exception e) {
            System.err.println("Error checking user existence: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean isProduct(Long product_id) {
        try {
            return mapper.findProductId(product_id) > 0;
        } catch (Exception e) {
            System.err.println("Error checking product existence: " + e.getMessage());
            return false;
        }
    }

    @Override
    public int updateRental(RentalVO vo) {
        return mapper.updateRental(vo);
    }
}
