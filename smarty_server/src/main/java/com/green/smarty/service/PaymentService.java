package com.green.smarty.service;

import com.green.smarty.mapper.PaymentMapper;
import com.green.smarty.vo.PaymentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Map;

@Service

public class PaymentService {
    @Autowired
    private PaymentMapper paymentMapper;

    // 결제 생성
    public String createPayment(PaymentVO paymentVO) {
        String payment_id = generatePaymentId();
        paymentVO.setPayment_id(payment_id);
        paymentVO.setPayment_date(LocalDate.now());
        paymentMapper.insertPayment(paymentVO);
        return payment_id;
    }

    //고유 결제 ID 생성
    private String generatePaymentId() {
        return "P_" + System.currentTimeMillis();
    }

    public boolean approvePayment(String payment_id) {
        int updateRows = paymentMapper.updatePaymentStatus(payment_id, "승인되었습니다");
        return updateRows > 0;
    }

    // 결제 조회
    public PaymentVO getPaymentById(String payment_id) {
        return paymentMapper.getPaymentById(payment_id);
    }

    public String iportPayment(PaymentVO vo) {
        RestTemplate restTemplate = new RestTemplate();
        String iportApiUrl = "https://api.iamport.kr/payments";
        String accessToken = getIportAccessToken();

        // 요청 본문 생성
        Map<String, Object> requestBody = Map.of(
                "merchant_uid", vo.getPayment_id(),
                "amount", vo.getAmount(),
                "name", "상품명",
                "buyer_name", "구매자 이름"
        );

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer" + accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 보내기
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(iportApiUrl, requestEntity,String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return "결제 요청 성공";
        } else {
            throw new RuntimeException("결제 요청 실패: " + response.getBody());
        }
    }
    private String getIportAccessToken() {
        // 인증 토큰 요청 로직 추가(API 키, 비밀키 사용)
        return "ACCESS_TOKEN";
    }
}
