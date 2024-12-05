package com.green.smarty.service;

import com.green.smarty.dto.PaymentDetailDTO;
import com.green.smarty.mapper.*;
import com.green.smarty.vo.PaymentVO;
import com.green.smarty.vo.RentalVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service

public class PaymentService {
    @Autowired
    private PaymentMapper paymentMapper;
    @Autowired
    private UserRentalMapper userRentalMapper;
    @Autowired
    private PublicMapper publicMapper;
    @Autowired
    private CartMapper cartMapper;
    @Autowired
    private UserProductMapper userProductMapper;

    public RentalVO insertRental(PaymentDetailDTO dto, String payment_id){
        LocalDateTime date = LocalDateTime.now();
        List<RentalVO> rentalVO = publicMapper.getRentalAll();
        List<RentalVO> rentalList = new ArrayList<>();

        for(RentalVO item : rentalVO){
            String itemDate = item.getRental_id().substring(2,10);
            System.out.println(itemDate);
            if(itemDate.equals("" + date.getYear() + date.getMonthValue() + (date.getDayOfMonth() < 10 ? "0" + date.getDayOfMonth() : date.getDayOfMonth()))){
                rentalList.add(item);
            }
        }

        String id = "R_" + date.getYear() + date.getMonthValue()
                + (date.getDayOfMonth() < 10 ? "0" + date.getDayOfMonth() : date.getDayOfMonth())
                + String.format("%03d", rentalList.size() + 1);
        System.out.println("rental ID : "+ id);

        RentalVO vo = RentalVO.builder()
                .rental_id(id)
                .count(dto.getCount())
                .rental_date(date)
                .product_id(dto.getProduct_id())
                .user_id(dto.getUser_id())
                .rental_status(true)
                .payment_id(payment_id)
                .build();
        userRentalMapper.insertRental(vo);
        System.out.println("insert rental : "+vo);

        Map<String, Object> map = new HashMap<>();
        map.put("product_id", dto.getProduct_id());
        map.put("count", dto.getCount());
        System.out.println("product_id 확인: " + map.get("product_id"));
        System.out.println("count 확인: "+map.get("count"));
        int stockDown = userRentalMapper.productStockDown(map);

        if (stockDown > 0) {
        System.out.println("재고 감소 product_id: " + dto.getProduct_id() + ", 요청 수량: " + dto.getCount());
        } else {
            throw new RuntimeException("stockDown 실패 : " + dto.getProduct_id());
        }
        return vo;
    }

    // 결제 조회
    public PaymentVO getPaymentById(String payment_id) {
        return paymentMapper.getPaymentById(payment_id);
    }

    // 외부 API로 결제 요청
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
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 보내기
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(iportApiUrl, requestEntity,String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return "결제 요청 성공";
        } else {
            throw new RuntimeException("결제 요청 실패" + response.getBody());
        }
    }

    private String getIportAccessToken() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String tokenApiUrl = "https://api.iamport.kr/users/getToken";

            Map<String, String> requestBody = Map.of(
                    "imp_key", System.getenv("I_PORT_API_KEY"),
                    "imp_secret", System.getenv("I_PORT_API_SECRET")
            );

            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody);
            ResponseEntity<Map> response = restTemplate.postForEntity(tokenApiUrl, requestEntity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                Map<String, String> tokenData = (Map<String, String>) responseBody.get("response");
                return tokenData.get("access_token");
            } else {
                throw new RuntimeException("액세스 토큰 요청 실패: " + response.getBody());
            }
        } catch (Exception e) {
            throw new RuntimeException("Iamport 토큰 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }
}
