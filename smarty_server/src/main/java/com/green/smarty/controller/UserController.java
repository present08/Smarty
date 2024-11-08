package com.green.smarty.controller;

import com.green.smarty.service.UserService;
import com.green.smarty.util.JWTUtil;
import com.green.smarty.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")

public class UserController {
    @Autowired
    private UserService service;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO loginRequest) {
        UserVO user = service.getUserByName(loginRequest.getUser_name());
        System.out.println("Find User: "+ user);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message","사용자를 못 찾음"));
        }
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message","비밀번호 불일치"));
        }
        user.setPassword(null);

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUser_name());
        claims.put("userId", user.getUser_id());

        String token = jwtUtil.generateToken(claims, 60);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        response.put("message","로그인 성공");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public List<UserVO> getUser() {
        List<UserVO> users = service.getAllUsers();
        System.out.println("유저가 들어오는지");
        return users;
    }
    @PostMapping("/users")
    public String postUser(@RequestBody UserVO vo) {
        System.out.println("유저 등록"+vo);
        Long userId = service.register(vo);
        return userId+" 번 등록되었습니다";
    }

}