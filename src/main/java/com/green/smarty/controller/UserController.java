package com.green.smarty.controller;

import com.green.smarty.domain.User;
import com.green.smarty.dto.PageRequestDTO;
import com.green.smarty.dto.PageResponseDTO;
import com.green.smarty.dto.UserDTO;
import com.green.smarty.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    // API 엔드포인트 생성
//    @GetMapping("/list")
//    public List<UserDTO> userList() {
//        return userService.get();
//    }

    @GetMapping("list")
    public PageResponseDTO<UserDTO> userList(PageRequestDTO pageRequestDTO) {
        log.info("페이지 요청" + pageRequestDTO);
        PageResponseDTO<UserDTO> list = userService.userList(pageRequestDTO);
        log.info("사용자 리스트" + list);
        return list;
    }


}
