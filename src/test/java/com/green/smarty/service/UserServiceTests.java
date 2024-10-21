package com.green.smarty.service;

import com.green.smarty.domain.User;
import com.green.smarty.dto.PageRequestDTO;
import com.green.smarty.dto.PageResponseDTO;
import com.green.smarty.dto.UserDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import java.util.List;

@SpringBootTest
@Log4j2
public class UserServiceTests {

    @Autowired
    private UserService userService;

    @Test
    public void testGet() {
        String id = "id77";
        UserDTO dto = userService.getUser(id);
        log.info("사용자 조회" + dto);
    }

    @Test
    public void testPaging() {
        PageRequestDTO pageRequestDTO =
                PageRequestDTO.builder()
                        .page(2)
                        .size(10)
                        .build();
        PageResponseDTO<UserDTO> response = userService.userList(pageRequestDTO);
        log.info("사용자 목록" + response);
    }
}
