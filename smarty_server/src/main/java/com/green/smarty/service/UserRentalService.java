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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserRentalService{
    @Autowired
    private UserRentalMapper userRentalMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserProductMapper userProductMapper;
    @Autowired
    private PublicMapper publicMapper;
    // 대여
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

        // 3. 대여 가능 여부 확인
        int stock = product.getStock(); // product.stock 값 가져오기
        int totalUnavailableQuantity = userRentalMapper.getTotalUnavailableQuantity(vo.getProduct_id()); // 상태별 감소 수량 합산
        int availableQuantity = stock - totalUnavailableQuantity; // 대여 가능 수량 계산

        log.info("대여 가능 여부 확인: stock={}, totalUnavailableQuantity={}, availableQuantity={}, 요청 수량={}",
                stock, totalUnavailableQuantity, availableQuantity, count);

        if (availableQuantity < count || availableQuantity <= 0) {
            throw new RuntimeException("대여 불가능: 남은 수량=" + availableQuantity +
                    ", 요청 수량=" + count + ", 상품 ID=" + vo.getProduct_id());
        }

        // 4. 날짜 확인
//        if (vo.getRental_date() == null || vo.getReturn_date() == null) {
//            throw new RuntimeException("대여 날짜 또는 반납 날짜가 누락되었습니다.");
//        }
        if (vo.getRental_date() == null) {
            vo.setRental_date(LocalDateTime.now()); // 기본 대여 날짜 설정
        }

        // 5. 대여 상태 설정
        vo.setRental_status(true);
        vo.setCount(count);

        // 6. 대여 정보 저장
        int rentalId = userRentalMapper.insertRental(vo);
        log.info("렌탈 데이터 저장 완료: Rental ID={}", rentalId);

        // 7. 대여 로그 기록
        insertRentalLog(vo.getRental_id(), vo.getProduct_id(), count);

        return rentalId;
    }

    // 새로운 메서드: 로그 기록
    private void insertRentalLog(String rentalId, String productId, int count) {
        // 1. 대여 가능한 status_id 조회
        List<String> statusIds = userRentalMapper.getAvailableStatusIds(productId, count);
        if (statusIds.size() < count) {
            throw new RuntimeException("대여 가능한 상태 ID가 충분하지 않습니다. 요청 수량: " + count + ", 상태 ID 수량: " + statusIds.size());
        }

        // 2. 대여 로그 기록 및 상태 변경
        for (String statusId : statusIds) {
            Map<String, Object> logData = new HashMap<>();
            logData.put("rental_id", rentalId); // 렌탈 ID
            logData.put("status_id", statusId); // 상태 ID
            logData.put("changed_status", "대여 중"); // 변경 상태
            logData.put("change_quantity", count); // 대여 수량

            log.info("Rental Log Data: {}", logData);

            try {
                userRentalMapper.insertRentalLogWithRentalId(logData); // 로그 삽입
                userRentalMapper.updateChangedStatus(statusId, "대여 중"); // 상태 변경
            } catch (Exception e) {
                log.error("Failed to insert rental log or update status: {}", logData, e);
                throw e;
            }
        }
    }

    //반납
    public int returnRental(String rental_id, int count) {
        log.info("반납할 렌탈 ID: {}, count: {}", rental_id, count);

        // 1. 대여 정보 확인
        RentalDTO rental = userRentalMapper.getRentalById(rental_id);
        if (rental == null) {
            throw new RuntimeException("대여 정보가 존재하지 않습니다. Rental ID: " + rental_id);
        }

        if (!rental.isRental_status()) {
            throw new RuntimeException("이미 반납된 대여입니다. Rental ID: " + rental_id);
        }

        // 2. 반납 데이터 업데이트
        RentalVO rentalVO = new RentalVO();
        rentalVO.setRental_id(rental_id);
        rentalVO.setRental_status(false);
        rentalVO.setReturn_date(LocalDateTime.now());
        int result = userRentalMapper.returnRental(rentalVO);

        if (result <= 0) {
            throw new RuntimeException("반납 처리 중 오류가 발생했습니다. Rental ID: " + rental_id);
        }
        log.info("반납 데이터 업데이트 완료: Rental ID={}", rental_id);

        // 3. 반납 처리 - 로그 삭제 및 상태 복구
        processReturnLogs(rental_id, rental.getProduct_id(), count);

        log.info("반납 처리 완료: Rental ID={}, Count={}", rental_id, count);
        return result;
    }

    // 새로운 메서드: 로그 삭제 및 상태 복구
    private void processReturnLogs(String rental_id, String product_id, int count) {
        // 1. 대여 중인 status_id 조회
        List<String> statusIds = userRentalMapper.getRentedStatusIds(product_id, count);
        if (statusIds.size() < count) {
            throw new RuntimeException("반납 처리 중 상태 ID가 충분하지 않습니다. Rental ID: " + rental_id);
        }

        // 2. 로그 삭제 및 상태 복구
        for (String statusId : statusIds) {
            log.info("반납 처리 중: Status ID={}", statusId);

            // 로그 삭제
            int logDeleted = userRentalMapper.deleteRentalLog(statusId, count);
            if (logDeleted <= 0) {
                throw new RuntimeException("반납 로그 삭제 실패. Status ID: " + statusId);
            }

            // 상태 복구
            int restored = userRentalMapper.restoreToAvailable(statusId);
            if (restored <= 0) {
                throw new RuntimeException("상태 복구 실패. Status ID: " + statusId);
            }

            log.info("로그 삭제 및 상태 복구 완료: Status ID={}", statusId);
        }
    }

    public int updatePaymentStatus(String rental_id, boolean payment_status) {
        Map<String, Object> map = new HashMap<>();
        map.put("rental_id", rental_id);
        map.put("payment_status", payment_status);

        int result = userRentalMapper.updatePaymentStatus(map);
        if (result == 0) {
            throw new RuntimeException("Payment status 업데이트 실패 : ");
        }
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
