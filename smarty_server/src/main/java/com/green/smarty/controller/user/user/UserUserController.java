package com.green.smarty.controller.user.user;

import com.green.smarty.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserUserController {
    @Autowired
    private UserService userService;

    //사용자 휴면 여부 확인
    @GetMapping("/me/{userId}")
    public String getUserStatus(@PathVariable("userId") String userId){
        return userService.checkUserStatus(userId);
    }
}