package com.green.smarty.mapper;

import com.green.smarty.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
//불러온 데이터를 저장할 함수를 생성
public interface UserMapper {
    Long register(UserVO vo);
    List<UserVO> getAllUsers();
    UserVO getUserByName(@Param("user_name") String username);
    UserVO getUserById(Long user_id);

}
