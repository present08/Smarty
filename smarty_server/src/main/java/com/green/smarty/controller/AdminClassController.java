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

    // 강의 등록
    @PostMapping("/")
    public String register(@RequestBody List<ClassAdminDTO> classList) {
        System.out.println("클래스 등록 classList = " + classList);
        adminClassService.register(classList);
        return "클래스 등록 성공";
    }

    // 선택한 시설 관련 강의 전체 조회
    @GetMapping("/list/{facility_id}")
    public List<ClassAdminDTO> getList(@PathVariable(name = "facility_id") String facility_id) {
        System.out.println("클래스 전체 조회! facility_id = " + facility_id);
        List<ClassAdminDTO> list = adminClassService.getList(facility_id);
        return list;
    }
<<<<<<<<< Temporary merge branch 1
//
//    @GetMapping("/{class_id}")
//    public ClassAdminDTO read(@PathVariable (name = "class_id") String class_id) {
//        System.out.println("컨트롤러 클래스 하나 조회!");
//        return adminClassService.read(class_id);
//    }
=========

    @GetMapping("/{class_id}")
    public ClassAdminDTO read(@PathVariable (name = "class_id") String class_id) {
        System.out.println("클래스 하나 조회! class_id = " + class_id);
        return adminClassService.read(class_id);
    }

>>>>>>>>> Temporary merge branch 2

}
