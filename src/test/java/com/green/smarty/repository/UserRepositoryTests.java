package com.green.smarty.repository;

import com.green.smarty.domain.User;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
@Log4j2
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void insertTest() {
        for (int i = 1; i< 431; i++) {
            User user = User.builder()
                    .ino(i)
                    .id("id" + i)
                    .pw("1111")
                    .email("email"+ i + "@green.com")
                    .name("smarty" + i)
                    .join_date(LocalDateTime.now())
                    .build();
            userRepository.save(user);
        }

    }

}
