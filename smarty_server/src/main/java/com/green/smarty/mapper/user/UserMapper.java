package com.green.smarty.mapper.user;

import com.green.smarty.vo.user.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface UserMapper {
    int register (UserVO vo);
    int modify (UserVO vo);
    void removeUser(String user_id);

    List<UserVO> getAllUsers();

    // 새로운 login_date를 업데이트하기 위한 메서드
    int updateLoginDate(@Param("userId") String userId, @Param("loginDate") LocalDate loginDate);
    // login_date에 따라 user_status를 불린값으로 업데이트
    int updateUserStatusByLoginDate();
    // 특정 user_id의 휴면 상태를 확인하는 메서드
    UserVO findUserById(@Param("userId") String userId);
    // 상태 업데이트 쿼리
    void updateUserStatus(@Param("userId") String userId, @Param("userStatus") boolean userStatus);
}
