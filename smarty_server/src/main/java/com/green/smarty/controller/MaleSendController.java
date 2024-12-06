package com.green.smarty.controller;

import com.green.smarty.dto.MailSendDTO;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/mail")
@Log4j2
public class MaleSendController {
    @Autowired
    UserMapper userMapper;

    @GetMapping("/getList")
    public List<UserVO> getUserListForEmail(){
        return userMapper.getUserForSendMail();
    }
}
