package com.green.smarty;

import com.green.smarty.mapper.UserMapper;
import com.green.smarty.vo.UserVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootTest

public class UserTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void insertUser() {
        UserVO vo = UserVO.builder()
                .user_id("test1")
                .user_name("test")
                .email("test1234@gmail.com")
                .password("1234")
                .phone("010-1234-4567")
                .address("경기도 성남시")
                .birthday(LocalDate.of(2024, 1, 23))
                .join_date(LocalDateTime.now())
                .login_date(LocalDate.now())
                .user_status(true)
                .level("silver")
                .build();
        int result = userMapper.insertUser(vo);
        System.out.println(result);
    }
}
