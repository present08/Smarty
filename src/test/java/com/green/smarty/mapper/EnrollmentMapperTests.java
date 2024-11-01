package com.green.smarty.mapper;

import com.green.smarty.mapper.user.UserMapper;
import com.green.smarty.vo.ClassVO;
import com.green.smarty.vo.EnrollmentVO;
import com.green.smarty.vo.user.UserVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@SpringBootTest
public class EnrollmentMapperTests {
    @Autowired
    private EnrollmentMapper enrollmentMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ClassMapper classMapper;

    @Test
    public void dummyEnrollInsert(){
        List<UserVO> users = userMapper.getAllUsers(); // 모든 유저 조회 메서드
        List<ClassVO> classes = classMapper.getAllClasses(); // 모든 강좌 조회 메서드


        if (users.isEmpty() || classes.isEmpty()) {
            System.err.println("No users or classes found. Please ensure dummy user and class data is inserted.");
            return;
        }
        // 랜덤 객체 생성

        Random random = new Random();

        for (int i = 0; i < 100; i++) {
            UserVO randomUser = users.get(random.nextInt(users.size()));
            ClassVO randomClass = classes.get(random.nextInt(classes.size()));

            try {
                enrollmentMapper.register(new EnrollmentVO(
                        UUID.randomUUID().toString(),
                        randomUser.getUser_id(),
                        randomClass.getClass_id()
                ));
            } catch (Exception e) {
                System.err.println("Error inserting enrollment for user: " + randomUser.getUser_id() + " - " + e.getMessage());
            }
        }
    }
}
