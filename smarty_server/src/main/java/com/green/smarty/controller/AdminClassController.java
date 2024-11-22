package com.green.smarty.controller;

import com.green.smarty.dto.ClassAdminDTO;
import com.green.smarty.service.AdminClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/classes")
public class AdminClassController {
    @Autowired
    private AdminClassService adminClassService;

    @PostMapping("/")
    public String register(@RequestBody List<ClassAdminDTO> classList) {
        System.out.println("컨트롤러 클래스 등록! classList = " + classList);
        adminClassService.register(classList);
        return "클래스 등록 성공";
    }

    @GetMapping("/list")
    public List<ClassAdminDTO> getList() {
        System.out.println("컨트롤러 클래스 전체 조회!");
        List<ClassAdminDTO> list = adminClassService.getList();
        return list;
    }

    @GetMapping("/{class_id}")
    public ClassAdminDTO read(@PathVariable (name = "class_id") String class_id) {
        System.out.println("컨트롤러 클래스 하나 조회!");
        return adminClassService.read(class_id);
    }

}

