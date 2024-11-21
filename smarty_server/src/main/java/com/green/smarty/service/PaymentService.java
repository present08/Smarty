package com.green.smarty.service;

import com.green.smarty.mapper.PaymentMapper;
import com.green.smarty.vo.PaymentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class PaymentService {
    @Autowired
    private PaymentMapper paymentMapper;

    public String createPayment(PaymentVO paymentVO) {
        String payment_id = generatePaymentId();
        paymentVO.setPayment_id(payment_id);
        paymentMapper.insertPayment(paymentVO);
        return payment_id;
    }

    private String generatePaymentId() {
        return "P_" + System.currentTimeMillis();
    }

    public boolean approvePayment(String payment_id) {
        int updateRows = paymentMapper.updatePaymentStatus(payment_id, "승인되었습니다");
        return updateRows > 0;
    }

    public PaymentVO getPaymentById(String payment_id) {
        return paymentMapper.getPaymentById(payment_id);
    }
}
