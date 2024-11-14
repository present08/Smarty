package com.green.smarty.mapper;

import com.green.smarty.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

@Mapper

public interface UserMapper {

    //사용자 정보 조회 by user_id XML 반환
    UserVO getById (String id);
    // 사용자 정보 조회 by email XML 반환
    UserVO getByEmail (String email);
    // 사용자 추가 (회원가입) XML 반환
    int insertUser (UserVO user);
    //아이디 찾기 XML 반환
    String findByID (String email, String user_name);
    //비밀번호 찾기 XML 반환
    UserVO resetPassword(Map<String, Object> params);
    //비밀번호 변경
    int updatePassword(UserVO user);
    // QR 코드로 사용자 업데이트
    int updateUserWithQRCode(UserVO qr_code);
    // 회원정보 수정
    int updateUserInfo(UserVO userVO);
    // 특정 user_id의 휴면 상태를 확인하는 메서드
    UserVO findUserById(@Param("userId") String userId);
    // 상태 업데이트 쿼리
    void updateUserStatus(@Param("userId") String userId, @Param("userStatus") boolean userStatus);

}
