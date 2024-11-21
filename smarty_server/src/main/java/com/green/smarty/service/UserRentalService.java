package com.green.smarty.service;

import com.fasterxml.jackson.core.JsonToken;
import com.green.smarty.dto.ProductRentalUserDTO;
import com.green.smarty.dto.RentalDTO;
import com.green.smarty.mapper.UserProductMapper;
import com.green.smarty.mapper.UserRentalMapper;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.dto.ProductDTO;
import com.green.smarty.vo.ProductVO;
import com.green.smarty.vo.RentalVO;
import com.green.smarty.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public int insertRental(RentalVO vo, int count) {

        System.out.println("대여 등록 시작: " + vo);

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

        // 상품 재고 확인
        if (product.getStock() < count) {
            throw new RuntimeException("상품재고가 부족합니다. ID: " + product.getStock() + "요청 수량: " + count);
        }

        // 날짜가 null인지 확인
        if (vo.getRental_date() == null || vo.getReturn_date() == null) {
            throw new RuntimeException("대여 날짜 또는 반납 날짜가 누락되었습니다.");
        }

        //대여 상태 설정
        vo.setRental_status(true);
        vo.setCount(count);

        int affectedRows = userRentalMapper.insertRental(vo);

        Map<String, Object> map = new HashMap<>();
        map.put("product_id", vo.getProduct_id());
        map.put("count", count);
        System.out.println("포로덕트 아이디 확인"+map.get("product_id"));
        System.out.println("카운트 확인"+map.get("count"));
        userRentalMapper.productStockDown(map);

        System.out.println("재고 감소 상품ID: " + vo.getProduct_id() + ", 요청 수량: " + count);

        return affectedRows;
    }

//    public int insertRental(RentalVO vo, int count) {
//        System.out.println("대여 등록 시작: " + vo);
//
//        // 사용자 및 상품 확인
//        UserVO user = userMapper.getById(vo.getUser_id());
//        if (user == null) {
//            throw new RuntimeException("존재하지 않는 사용자입니다. ID: " + vo.getUser_id());
//        }
//        // 상품 존재 여부 확인
//        ProductVO product = userProductMapper.getProductById(vo.getProduct_id());
//        if (product == null) {
//            throw new RuntimeException("존재하지 않는 상품입니다. ID: " + vo.getProduct_id());
//        }
//
//        // 상품 재고 확인
//        if (product.getStock() < count) {
//            throw new RuntimeException("재고 부족. 현재 재고: " + product.getStock() + ", 요청 수량: " + count);
//        }
//
//        // 대여 상태 설정
//        vo.setRental_status(true);
//
//        // 대여 등록
//        int affectedRows = userRentalMapper.insertRental(vo);
//
//        // 재고 감소
//        userRentalMapper.productStockDown(vo.getProduct_id(), count);
//
//        System.out.println("재고 감소 상품ID: " + vo.getProduct_id() + ", 감소 수량: " + count);
//
//        return affectedRows;
//    }


    public List<RentalDTO> getAllRentals() {
        List<RentalDTO> rentalList = userRentalMapper.getAllRentals();
        return rentalList;
    }


    public int returnRental(String rental_id, int count) {
        System.out.println("반납할 렌탈 ID: " + rental_id + ", count: " + count);

        RentalDTO rental = userRentalMapper.getRentalById(rental_id);

        if (rental == null) {
            throw new RuntimeException("대여 정보가 존재하지 않습니다 ID: " + rental_id);
        }

        if (!rental.isRental_status()) {
            throw new RuntimeException("이미 반납된 대여입니다 ID: " + rental_id);
        }

        rental.setRental_status(false);

        int result = userRentalMapper.updateRental(rental);

        if (result > 0) {
            Map<String, Object> map = new HashMap<>();
            map.put("product_id", rental.getProduct_id());
            map.put("count", count);
            System.out.println("재고 증가 처리 데이터: "+map);
            userRentalMapper.productStockUp(map);
            System.out.println("상품 재고 증가 상품ID: " +  rental.getProduct_id() + ", 증가 수량: " + count);
        }
        return result;
    }

//    public int returnRental(String rental_id, int count) {
//        System.out.println("반납할 렌탈 ID: " + rental_id);
//
//        RentalDTO rental = userRentalMapper.getRentalById(rental_id);
//        if (rental == null) {
//            throw new RuntimeException("반납 실패: 대여 정보가 존재하지 않습니다 ID: " + rental_id);
//        }
//
//        if (!rental.isRental_status()) {
//            throw new RuntimeException("반납 실패: 이미 반납된 대여입니다 ID: " + rental_id);
//        }
//
//        // 반납 처리
//        rental.setRental_status(false);
//        int result = userRentalMapper.updateRental(rental);
//
//        if (result > 0) {
//            userRentalMapper.productStockUp(rental.getProduct_id(), count);
//            System.out.println("재고 증가 상품ID: " + rental.getProduct_id() + ", 증가 수량: " + count);
//        }
//
//        return result;
//    }


    public RentalDTO getRentalById(String rental_id) {
        return userRentalMapper.getRentalById(rental_id);
    }


    public int updateRental(RentalDTO dto) {
        return userRentalMapper.updateRental(dto);
    }


    public List<ProductRentalUserDTO> getUserRentalListData(String user_id) {
        List<ProductRentalUserDTO> result = userRentalMapper.getUserRentalListData(user_id);
        return result;
    }
}
