package com.green.smarty.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.green.smarty.dto.*;
import com.green.smarty.mapper.*;
import com.green.smarty.service.UserMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.service.PaymentService;
import com.green.smarty.service.UserReservationService;
import com.green.smarty.vo.PaymentVO;
import com.green.smarty.vo.RentalVO;
import com.green.smarty.vo.ReservationVO;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PublicMapper publicMapper;

    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private UserReservationMapper reservationMapper;

    @Autowired
    private UserReservationService reservationService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserMembershipService userMembershipService;


    // 결제 생성
    @PostMapping("/create")
    public String createPayment(@RequestBody PaymentDetailDTO dto) {
        System.out.println(dto);
        LocalDateTime date = LocalDateTime.now();
        List<PaymentVO> paymentVO = publicMapper.getPaymentAll();
        List<PaymentVO> paymentList = new ArrayList<>();
        for (PaymentVO item : paymentVO) {
            String itemDate = item.getPayment_id().substring(2, 10);
            System.out.println(itemDate);
            if (itemDate.equals("" + date.getYear() + date.getMonthValue() + (date.getDayOfMonth() < 10 ? "0" + date.getDayOfMonth() : date.getDayOfMonth()))) {
                paymentList.add(item);
            }
        }

        String id = "P_" + date.getYear() + date.getMonthValue()
                + (date.getDayOfMonth() < 10 ? "0" + date.getDayOfMonth() : date.getDayOfMonth())
                + String.format("%03d", paymentList.size() + 1);
        System.out.println("payment ID : " + id);
        PaymentVO vo = PaymentVO.builder()
                .payment_id(id)
                .reservation_id(dto.getReservation_id())
                .enrollment_id(dto.getEnrollment_id())
                .amount(dto.getAmount())
                .payment_date(date)
                .build();

        paymentMapper.insertPayment(vo);
        RentalVO rentalID = paymentService.insertRental(dto, id);

        // 멤버십 업데이트
        userMembershipService.updateMembershipLevel(dto.getUser_id(), dto.getAmount());

        return id;
    }

    // @PutMapping("/approve/{payment_id}")
    // public ResponseEntity<?> approvePayment(@PathVariable String payment_id) {
    // try {
    // boolean success = paymentService.approvePayment(payment_id);
    // if (success) {
    // return ResponseEntity.ok("결제 승인");
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND)
    // .body("해당 결제를 찾을 수 없습니다");
    // }
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body("결제 생성 중 오류 발생 : " + e.getMessage());
    // }
    // }

    // 결제 조회
    // @GetMapping("/{payment_id}")
    // public ResponseEntity<?> getPaymentById(@PathVariable String payment_id) {
    // try {
    // PaymentVO payment = paymentService.getPaymentById(payment_id);
    // if (payment != null) {
    // PaymentDTO responseDTO = PaymentDTO.builder()
    // .payment_id(payment.getPayment_id())
    // .reservation_id(payment.getReservation_id())
    // .enrollment_id(payment.getEnrollment_id())
    // .rental_id(payment.getRental_id())
    // .payment_date(payment.getPayment_date())
    // .build();
    //
    // return ResponseEntity.ok(Map.of("결제 조회 성공: ", responseDTO));
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND)
    // .body(Map.of("message", "결제 데이터를 찾을 수 없습니다"));
    // }
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body(Map.of("결제 조회 실패", e.getMessage()));
    //
    // }
    // }
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
    public UserActivityDTO getList(@PathVariable String user_id) {
        System.out.println(user_id);
        List<ReservationVO> reservationVO = publicMapper.getReservationAll();
        List<EnrollmentClassDTO> enrollmentClassDTO = paymentMapper.getEnrollmentClass();
        List<ReservationVO> reservationList = new ArrayList<>();
        List<EnrollmentClassDTO> enrollmentList = new ArrayList<>();

        for (ReservationVO item : reservationVO) {
            if (item.getUser_id().equals(user_id)) {
                reservationList.add(item);
            }
        }
        for (EnrollmentClassDTO item : enrollmentClassDTO) {
            if (item.getUser_id().equals(user_id)) {
                enrollmentList.add(item);
            }
        }
        UserActivityDTO result = UserActivityDTO.builder()
                .enrollmentList(enrollmentList)
                .reservationList(reservationList)
                .build();

        return result;
    }

    // enrollment Payment
    @PostMapping("/enrollment")
    public String enrollPayment(@RequestBody Map<String, String> enrollData) {

        System.out.println(enrollData);
        LocalDateTime now = LocalDateTime.now();
        List<PaymentVO> paymentVO = publicMapper.getPaymentAll();
        List<PaymentVO> paymentList = new ArrayList<>();
        for (PaymentVO i : paymentVO) {
            if (i.getPayment_id().substring(2, 10)
                    .equals(now.toLocalDate().format(DateTimeFormatter.ofPattern("yyyyMMdd")))) {
                paymentList.add(i);
            }
        }
        String id = "P_" + now.toLocalDate().format(DateTimeFormatter.ofPattern("yyyyMMdd"))
                + String.format("%03d", paymentList.size() + 1);

        PaymentVO vo = PaymentVO.builder()
                .reservation_id(null)
                .enrollment_id(enrollData.get("enrollment_id"))
                .payment_id(id)
                .amount(Float.parseFloat(enrollData.get("amount")))
                .payment_date(now)
                .payment_status(true)
                .build();
        paymentMapper.insertPayment(vo);
        paymentMapper.updateEnroll(enrollData.get("enrollment_id"));

        // 멤버십 업데이트
        userMembershipService.updateMembershipLevel(enrollData.get("user_id"), enrollData.get("amount"));

        return "예약 완료";
    }

    // reservation Payment
    @PostMapping("/reservation")
    public UserReservationDTO reserPayment(@RequestBody ReservationDTO dto) {
        // 결제 승인시 reservation Table insert
        reservationMapper.insertReservation(dto);
        System.out.println("payment" + dto);
        LocalDateTime now = LocalDateTime.now();

        List<PaymentVO> paymentVO = publicMapper.getPaymentAll();
        List<PaymentVO> paymentList = new ArrayList<>();
        for (PaymentVO i : paymentVO) {
            if (i.getPayment_id().substring(2, 10)
                    .equals(now.toLocalDate().format(DateTimeFormatter.ofPattern("yyyyMMdd")))) {
                paymentList.add(i);
            }
        }
        System.out.println("payment List : " + paymentList);
        String id = "P_" + now.toLocalDate().format(DateTimeFormatter.ofPattern("yyyyMMdd"))
                + String.format("%03d", paymentList.size() + 1);
        System.out.println("payment ID : " + id);
        PaymentVO vo = PaymentVO.builder()
                .reservation_id(dto.getReservation_id())
                .enrollment_id(null)
                .payment_id(id)
                .amount(dto.getAmount())
                .payment_date(now)
                .payment_status(true)
                .build();

        System.out.println(vo);
        paymentMapper.insertPayment(vo);

        UserReservationDTO result = reservationService.insertReservation(dto);

        // 멤버십 업데이트
        userMembershipService.updateMembershipLevel(dto.getUser_id(), dto.getAmount());

        return result;
    }

}
