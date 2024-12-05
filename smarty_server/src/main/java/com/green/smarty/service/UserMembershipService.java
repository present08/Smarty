package com.green.smarty.service;

import com.green.smarty.dto.UserClassApplicationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.mybatis.spring.SqlSessionTemplate;

import com.green.smarty.mapper.UserMembershipMapper;
import com.green.smarty.vo.MembershipVO;

import java.util.List;

@Service
@RequiredArgsConstructor

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
        userMembershipMapper.updateMembershipLevel(user_id, newLevel);
    }

    public List<MembershipVO> getUserMembergrade (String user_id) {
        List<MembershipVO> result = userMembershipMapper.getUserMembergrade(user_id);
        return result;
    }

    @Scheduled(cron = "0 0 0 1 6,12 ?") //6월 12월에 수정
//    @Scheduled(cron = "0 */1 * * * ?") // -> 테스트용 1분마다 변경
    public void scheduledMembershipReset() {
        int resetCount = userMembershipMapper.resetMembershipEvery6Months();
        if (resetCount > 0) {
            System.out.println("Memberships reset successfully: " + resetCount);
        } else {
            System.out.println("No memberships required resetting.");
        }
    }
}
