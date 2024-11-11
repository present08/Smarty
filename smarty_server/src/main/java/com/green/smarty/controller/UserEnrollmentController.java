package com.green.smarty.controller;

import com.green.smarty.service.EnrollmentService;
import com.green.smarty.vo.EnrollmentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class UserEnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<EnrollmentVO>> getUserEnrollments(@PathVariable String userId) {
        List<EnrollmentVO> enrollments = enrollmentService.getEnrollmentsByUserId(userId);
        return ResponseEntity.ok(enrollments);
    }
}
