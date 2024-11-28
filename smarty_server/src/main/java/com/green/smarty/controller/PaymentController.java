package com.green.smarty.controller;

import com.green.smarty.dto.EnrollmentClassDTO;
import com.green.smarty.dto.PaymentDetailDTO;
import com.green.smarty.dto.UserActivityDTO;
import com.green.smarty.mapper.PaymentMapper;
import com.green.smarty.mapper.PublicMapper;
import com.green.smarty.service.PaymentService;
import com.green.smarty.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PublicMapper publicMapper;

    @Autowired
    private PaymentMapper paymentMapper;

    // 결제 생성
    @PostMapping("/create")
    public String createPayment(@RequestBody PaymentDetailDTO dto) {
        System.out.println(dto);
        LocalDateTime date = LocalDateTime.now();
        List<PaymentVO> paymentVO = publicMapper.getPaymentAll();
        List<PaymentVO> paymentList = new ArrayList<>();
        for(PaymentVO item : paymentVO){
            String itemDate = item.getPayment_id().substring(2,10);
            System.out.println(itemDate);
            if(itemDate.equals("" + date.getYear() + date.getMonthValue() + date.getDayOfMonth())){
                paymentList.add(item);
            }
        }

        String id = "P_"+ date.getYear() + date.getMonthValue() + date.getDayOfMonth() + String.format("%03d",paymentList.size()+1);
        System.out.println("payment ID : "+ id);
        PaymentVO vo = PaymentVO.builder()
                    .payment_id(id)
                    .reservation_id(dto.getReservation_id())
                    .enrollment_id(dto.getEnrollment_id())
                    .amount(dto.getAmount())
                    .payment_date(date)
                    .build();

        paymentMapper.insertPayment(vo);
        RentalVO rentalID = paymentService.insertRental(dto, id);

        return id;
    }

//    @PutMapping("/approve/{payment_id}")
//    public ResponseEntity<?> approvePayment(@PathVariable String payment_id) {
//        try {
//            boolean success = paymentService.approvePayment(payment_id);
//            if (success) {
//                return ResponseEntity.ok("결제 승인");
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body("해당 결제를 찾을 수 없습니다");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("결제 생성 중 오류 발생 : " + e.getMessage());
//        }
//    }

    //결제 조회
//    @GetMapping("/{payment_id}")
//    public ResponseEntity<?> getPaymentById(@PathVariable String payment_id) {
//        try {
//            PaymentVO payment = paymentService.getPaymentById(payment_id);
//            if (payment != null) {
//                PaymentDTO responseDTO = PaymentDTO.builder()
//                        .payment_id(payment.getPayment_id())
//                        .reservation_id(payment.getReservation_id())
//                        .enrollment_id(payment.getEnrollment_id())
//                        .rental_id(payment.getRental_id())
//                        .payment_date(payment.getPayment_date())
//                        .build();
//
//                return ResponseEntity.ok(Map.of("결제 조회 성공: ", responseDTO));
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body(Map.of("message", "결제 데이터를 찾을 수 없습니다"));
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("결제 조회 실패", e.getMessage()));
//
//        }
//    }
    @GetMapping("/{payment_id}")
    public ResponseEntity<?> getPaymentById(@PathVariable String payment_id) {
        try {
            PaymentVO payment = paymentService.getPaymentById(payment_id);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("결제 데이터를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 조회 중 오류 발생: " + e.getMessage());
        }
    }

    @GetMapping("/list/{user_id}")
    public UserActivityDTO getList(@PathVariable String user_id){
        System.out.println(user_id);
        List<ReservationVO> reservationVO = publicMapper.getReservationAll();
        List<EnrollmentClassDTO> enrollmentClassDTO = paymentMapper.getEnrollmentClass();
        List<ReservationVO> reservationList = new ArrayList<>();
        List<EnrollmentClassDTO> enrollmentList = new ArrayList<>();

        for(ReservationVO item : reservationVO){
            if(item.getUser_id().equals(user_id)){
                reservationList.add(item);
            }
        }
        for(EnrollmentClassDTO item : enrollmentClassDTO){
            if(item.getUser_id().equals(user_id)){
                enrollmentList.add(item);
            }
        }
        UserActivityDTO result = UserActivityDTO.builder()
                .enrollmentList(enrollmentList)
                .reservationList(reservationList)
                .build();

        return result;
    }

}
