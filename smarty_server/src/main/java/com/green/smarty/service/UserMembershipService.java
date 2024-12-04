package com.green.smarty.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.smarty.mapper.UserMembershipMapper;
import com.green.smarty.vo.MembershipVO;

@Service

public class UserMembershipService {

    @Autowired
    UserMembershipMapper userMembershipMapper;

    // 결제 금액 합계를 반환하는 메서드
    public float getPaymentDetailsByUserId(String user_id) {
        return userMembershipMapper.getPaymentDetailsByUserId(user_id);
    }

    public boolean saveMembership(MembershipVO membership) {
        return userMembershipMapper.insertMembership(membership) > 0;
    }

    public void updateMembershipLevel(String user_id, float amount) {
        float totalAmount = userMembershipMapper.getPaymentDetailsByUserId(user_id) + amount;

        System.out.println("total  " + totalAmount);
        System.out.println("amount  " + amount);

        String newLevel = "브론즈";
        if (totalAmount >= 1000) {
            newLevel = "다이아";
        } else if (totalAmount >= 800) {
            newLevel = "플레티넘";
        } else if (totalAmount >= 600) {
            newLevel = "골드";
        } else if (totalAmount >= 300) {
            newLevel = "실버";
        }

        // 여기에서 메서드 이름을 잘못 적은 것 같습니다.
        userMembershipMapper.updateMembershipLevel(user_id, newLevel); // 수정된 부분
    }
}
