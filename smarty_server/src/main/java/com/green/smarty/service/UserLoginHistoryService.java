package com.green.smarty.service;

import com.green.smarty.mapper.UserLoginHistoryMapper;
import com.green.smarty.vo.LoginHistoryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserLoginHistoryService {

    @Autowired
    private UserLoginHistoryMapper userloginHistoryMapper;

    // 로그인 기록 삽입
    public void logLoginSuccess(LoginHistoryVO loginHistory) {
        loginHistory.setLogin_status("SUCCESS");
        userloginHistoryMapper.insertLoginHistory(loginHistory);
    }

    // 로그인 실패 기록 삽입
    public void logLoginFailure(LoginHistoryVO loginHistory) {
        loginHistory.setLogin_status("FAILURE");
        userloginHistoryMapper.insertLoginFailureHistory(loginHistory);
    }

    // 특정 사용자의 로그인 기록 조회
    public List<LoginHistoryVO> getLoginHistory(String userId) {
        return userloginHistoryMapper.getLoginHistoryByUserId(userId);
    }

    // 로그아웃 시간 업데이트
    public void logLogoutTime(String userId) {
        userloginHistoryMapper.updateLogoutTime(userId);
    }
}
