package com.green.smarty;

import com.green.smarty.vo.PaymentVO;
import com.green.smarty.mapper.PaymentMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Random;

@SpringBootTest
public class PaymentDummyTest {

    @Autowired
    private PaymentMapper paymentMapper;

    @Test
    public void insertDailyDummyPayments() {
        LocalDate startDate = LocalDate.of(2024, 12, 1); // 시작 날짜
        LocalDate endDate = LocalDate.now(); // 오늘 날짜

        Random random = new Random(); // 랜덤 값 생성기
        int paymentCount = 0; // 결제 ID 카운터

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            // 날짜별로 하나의 매출 데이터만 생성
            String paymentId = "P_" + date.toString().replace("-", "") + String.format("%03d", ++paymentCount);
            int amount = 1_000_000 + random.nextInt(1_000_001); // 1,000,000원 ~ 2,000,000원 사이 금액
            LocalDateTime paymentDate = LocalDateTime.of(date, LocalDateTime.now().toLocalTime());

            PaymentVO payment = PaymentVO.builder()
                    .payment_id(paymentId)
                    .amount(amount) // 정수 금액
                    .payment_date(paymentDate)
                    .payment_status(true)
                    .build();

            try {
                paymentMapper.insertPayment(payment);
                System.out.println("Inserted payment: " + payment);
            } catch (Exception e) {
                System.err.println("Failed to insert payment for date " + date + ": " + e.getMessage());
            }
        }
    }
}
