package com.green.smarty.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.dto.ClassResponseDTO;
import com.green.smarty.dto.UserClassDTO;
import com.green.smarty.mapper.UserClassMapper;
import com.green.smarty.service.UserClassService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/user/class")
public class UserClassController {
    @Autowired
    private UserClassMapper userClassMapper;
    @Autowired
    private UserClassService userClassService;

    @GetMapping("/")
    public ClassResponseDTO getClassAll() {
        List<UserClassDTO> classdto = userClassMapper.getClassDTO();
        Map<String, List<String>> weekday = userClassService.getClassWeekday();
        ClassResponseDTO dto = ClassResponseDTO.builder()
                .weekday(weekday)
                .classDTO(classdto)
                .build();
        return dto;
    }

    @PostMapping("/enroll")
    public String postMethodName(@RequestBody Map<String, String> enrollData) {
        System.out.println(enrollData);
        String result = userClassService.classEnrollment(enrollData);
        System.out.println(result);
        return result;
    }

}
