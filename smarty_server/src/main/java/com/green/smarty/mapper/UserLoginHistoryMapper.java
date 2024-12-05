package com.green.smarty.mapper;

import com.green.smarty.vo.LoginHistoryVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper

public interface UserLoginHistoryMapper {

    void insertLoginHistory(LoginHistoryVO loginHistory);

    List<LoginHistoryVO> getLoginHistoryByUserId(String userId);

    void updateLogoutTime(String userId);

    void insertLoginFailureHistory(LoginHistoryVO loginHistory);
}
