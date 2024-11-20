package com.green.smarty.controller;

import com.green.smarty.service.PaymentService;
import com.green.smarty.vo.PaymentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody PaymentVO paymentVO) {
        try {
            String payment_id = paymentService.createPayment(paymentVO);
            return ResponseEntity.ok(Map.of(
                    "message","결제가 생성되었습니다",
                    "payment_id", payment_id
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("결제 생성 중 오류 발생 : " + e.getMessage());
        }
    }

    @PutMapping("/approve/{payment_id}")
    public ResponseEntity<?> approvePayment(@PathVariable String payment_id) {
        try {
            boolean success = paymentService.approvePayment(payment_id);
            if (success) {
                return ResponseEntity.ok("결제 승인");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("해당 결제를 찾을 수 없습니다");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("결제 생성 중 오류 발생 : " + e.getMessage());
        }
    }

    @GetMapping("/{payment_id}")
    public ResponseEntity<PaymentVO> getPaymentById(@PathVariable String payment_id) {
        try {
            PaymentVO payment = paymentService.getPaymentById(payment_id);
            if (payment != null) {
                return new ResponseEntity<>(payment, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
