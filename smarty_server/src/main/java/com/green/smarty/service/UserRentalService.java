package com.green.smarty.service;

import com.green.smarty.dto.ProductRentalUserDTO;
import com.green.smarty.dto.RentalDTO;
import com.green.smarty.mapper.*;
import com.green.smarty.vo.ProductVO;
import com.green.smarty.vo.RentalVO;
import com.green.smarty.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    @Autowired
    private PublicMapper publicMapper;
    //대여
    public int insertRental(RentalVO vo, int count) {
        log.info("대여 등록 시작: {}", vo);

        // 1. 사용자 존재 여부 확인
        UserVO user = userMapper.getById(vo.getUser_id());
        if (user == null) {
            throw new RuntimeException("존재하지 않는 사용자입니다. ID: " + vo.getUser_id());
        }

        // 2. 상품 존재 여부 확인
        ProductVO product = userProductMapper.getProductById(vo.getProduct_id());
        if (product == null) {
            throw new RuntimeException("존재하지 않는 상품입니다. ID: " + vo.getProduct_id());
        }

        // 3. 상품 재고 확인
        int availableStock = userRentalMapper.getAvailableStock(vo.getProduct_id());
        if (availableStock < count) {
            throw new RuntimeException("상품 재고가 부족합니다. 요청 수량: " + count + ", 대여 가능 수량: " + availableStock);
        }

        // 4. 날짜 확인
        if (vo.getRental_date() == null || vo.getReturn_date() == null) {
            throw new RuntimeException("대여 날짜 또는 반납 날짜가 누락되었습니다.");
        }

        // 5. 대여 상태 설정
        vo.setRental_status(true);
        vo.setCount(count);

        int rentalId = userRentalMapper.insertRental(vo);
        log.info("렌탈 데이터 저장 완료: Rental ID={}", rentalId);

        // 7. 대여 가능한 status_id 조회
        List<String> statusIds = userRentalMapper.getAvailableStatusIds(vo.getProduct_id(), count);
        if (statusIds.size() < count) {
            throw new RuntimeException("대여 가능한 상태 ID가 충분하지 않습니다. 요청 수량: " + count + ", 상태 ID 수량: " + statusIds.size());
        }

        // 8. 대여 로그 기록 및 상태 변경
        for (String statusId : statusIds) {
            Map<String, Object> logData = new HashMap<>();
            logData.put("rental_id", rentalId); // 렌탈 ID
            logData.put("status_id", statusId); // 상태 ID
            logData.put("product_id", vo.getProduct_id()); // 상품 ID
            logData.put("changed_status", "대여 중"); // 변경 상태
            logData.put("change_quantity", count); // 대여 수량
            userRentalMapper.insertRentalLogWithRentalId(logData); // 로그 기록

            userRentalMapper.updateChangedStatus(statusId, "대여 중"); // 상태 변경
            log.info("상태 변경 및 로그 기록 완료: Rental ID={}, Status ID={}, Changed Status='대여 중'", rentalId, statusId);
        }

        return rentalId;
    }


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

        // 반납 데이터 업데이트
        RentalVO rentalVO = new RentalVO();
        rentalVO.setRental_id(rental_id);
        rentalVO.setRental_status(false);
        rentalVO.setReturn_date(LocalDateTime.now());
        int result = userRentalMapper.returnRental(rentalVO);

        if (result > 0) {
            Map<String, Object> map = new HashMap<>();
            map.put("product_id", rental.getProduct_id());
            map.put("count", count);
            System.out.println("재고 증가 처리 데이터: "+map);
            userRentalMapper.productStockUp(map);
            System.out.println("상품 재고 증가 상품ID: " +  rental.getProduct_id() + ", 증가 수량: " + count);

//            int paymentUpdateResult = updatePaymentStatus(rental_id, false);
//
//            if (paymentUpdateResult > 0) {
//                System.out.println("결제 상태 업데이트 성공: " + rental_id);
//            } else {
//                throw new RuntimeException("결제 상태 업데이트 실패" + rental_id);
//            }

        }
        return result;
    }

    public int updatePaymentStatus(String rental_id, boolean payment_status) {
        Map<String, Object> map = new HashMap<>();
        map.put("rental_id", rental_id);
        map.put("payment_status", payment_status);

        int result = userRentalMapper.updatePaymentStatus(map);
        if (result == 0) {
            throw new RuntimeException("Payment status 업데이트 실패 : ");
        }

        log.info("반납 데이터 업데이트 완료: Rental ID={}", rental_id);

        // 3. 대여 중인 status_id 조회
        List<String> statusIds = userRentalMapper.getRentedStatusIds(rental.getProduct_id(), count);
        if (statusIds.size() < count) {
            throw new RuntimeException("반납 처리 중 상태 ID가 충분하지 않습니다. Rental ID: " + rental_id);
        }

        // 4. 상태 복구 및 로그 삭제
        for (String statusId : statusIds) {
            // 로그 삭제
            userRentalMapper.deleteRentalLog(statusId, count);

            // 상태 복구
            userRentalMapper.restoreToAvailable(statusId);

            log.info("반납 처리 완료 - 상태 복구: Status ID={}, Count={}", statusId, count);
        }

        log.info("반납 처리 완료: Rental ID={}, Count={}", rental_id, count);

        return result;
    }

    // 대여 조회
    public List<RentalDTO> getAllRentals() {
        List<RentalDTO> rentalList = userRentalMapper.getAllRentals();
        return rentalList;
    }

    public RentalDTO getRentalById(String rental_id) {
        return userRentalMapper.getRentalById(rental_id);
    }


    public List<ProductRentalUserDTO> getUserRentalListData(String user_id) {
        List<ProductRentalUserDTO> result = userRentalMapper.getUserRentalListData(user_id);
        return result;
    }

//    (영준) user_id가 아니라 이메일을 가져오기 위한 코드
    public String getEmailByUserId(String user_id){
        return userRentalMapper.getEmailByUserId(user_id);
    }

    //    (영준) 기간 지난 rental 목록들 전부가져옴
    public List<RentalDTO> getOverdueRentals(){
        return userRentalMapper.getOverdueRentals();
    }
}
