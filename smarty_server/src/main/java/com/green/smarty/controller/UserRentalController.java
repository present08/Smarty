package com.green.smarty.controller;

import com.green.smarty.dto.ProductRentalMyPageUserDTO;
import com.green.smarty.dto.ProductRentalUserDTO;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.mapper.UserProductMapper;
import com.green.smarty.service.SendEmailService;
import com.green.smarty.service.UserRentalService;

import com.green.smarty.dto.RentalDTO;
import com.green.smarty.vo.RentalVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/api")

public class UserRentalController {
    @Autowired
    private UserRentalService userRentalService;

    // (영준)
    @Autowired
    private SendEmailService sendEmailService;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserProductMapper userProductMapper;

    @GetMapping("/rentals")
    public ResponseEntity<List<RentalDTO>> getRental() {
        try {
            List<RentalDTO> rentals = userRentalService.getAllRentals();
            System.out.println("렌탈 리스트: "+rentals);
            return new ResponseEntity<>(rentals, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("렌탈 조회 오류: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 대여 등록
    @PostMapping("/rentals")
    public ResponseEntity<?> postRental(@RequestBody Map<String, Object> rentalRequest) {
        try {
            String user_id = (String) rentalRequest.get("user_id");
            String product_id = (String) rentalRequest.get("product_id");
            String rental_date = (String) rentalRequest.get("rental_date");
            String return_date = (String) rentalRequest.get("return_date");
            int count = (int) rentalRequest.get("count");

            System.out.println("대여 요청 데이터: user_id=" + user_id + ", product_id=" + product_id + ", count=" + count);

            //데이터 생성
            RentalVO vo = new RentalVO();
            vo.setUser_id(user_id);
            vo.setProduct_id(product_id);
            vo.setRental_date(LocalDateTime.parse(rental_date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            vo.setReturn_date(LocalDateTime.parse(return_date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            vo.setRental_status(true);
            vo.setCount(count);


            //대여 생성 및 ID 반환
            int rentalId = userRentalService.insertRental(vo, count);
            System.out.println("rental_id 반환 확인: " + rentalId);



            //대여 ID 반환
            return ResponseEntity.ok(Map.of(
                            "message",
                            "대여가 완료되었습니다.",
                            "rental_id", String.valueOf(rentalId)
                    ));
        } catch (Exception e) {
            System.err.println("대여 등록 중 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("대여 등록 중 오류가 발생했습니다." + e.getMessage());
        }
    }

    // 대여 반납
    @PutMapping("/rentals/{rental_id}/return")
    public ResponseEntity<String> returnRental(@PathVariable String rental_id, @RequestParam int count) {
        System.out.println("반납 요청 rental_id: " + rental_id + ", count: " + count);
        try {
            int updatedRows = userRentalService.returnRental(rental_id, count);
            if (updatedRows > 0) {
                return new ResponseEntity<>("반납 완료", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("반납 실패: 해당 렌탈이 존재하지 않습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("반납 처리 오류: " + e.getMessage());
            return new ResponseEntity<>("반납 처리 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/rentals/{rental_id}/payment_status")
    public ResponseEntity<String> updatePaymentStatus(@PathVariable String rental_id, @RequestParam boolean payment_status) {
        try {
            int result = userRentalService.updatePaymentStatus(rental_id, payment_status);
            if (result > 0) {
                return ResponseEntity.ok("결제 상태가 성공적으로 업데이트");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("결제 상태 업데이트 실패");
                }
            } catch (Exception e) {
                System.out.println("결제 상태 업데이트 오류" + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 상태 업데이트 오류");
            }
    }

    @GetMapping("/rentals/{rental_id}")
    public ResponseEntity<RentalDTO> getRentalById(@PathVariable String rental_id) {
        System.out.println("특정 대여 조회 렌탈ID: " + rental_id );  // 로그 추가
        try {
            RentalDTO rental = userRentalService.getRentalById(rental_id);

            if (rental != null) {
                return new ResponseEntity<>(rental, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/rentalUser")
    public List<ProductRentalUserDTO> getUserRentalListData(@RequestParam String user_id) {
        System.out.println("유저아이디 확인 : "+user_id);
        List<ProductRentalUserDTO> result = userRentalService.getUserRentalListData(user_id);
        return result;
    }

}
