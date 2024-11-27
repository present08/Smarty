package com.green.smarty.mapper;

import com.green.smarty.vo.PaymentVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

@Mapper

public interface PaymentMapper {
    void insertPayment(PaymentVO paymentVO);
    int updatePaymentStatus(@Param("payment_id") String payment_id, @Param("status") String status);
    PaymentVO getPaymentById(@Param("payment_id") String payment_id);
}
