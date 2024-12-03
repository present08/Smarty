package com.green.smarty.controller;

import com.green.smarty.dto.TotalMembershipDTO;
import com.green.smarty.service.UserMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/membership")
public class MembershipController {

    @Autowired
    UserMembershipService userMembershipService;

    @GetMapping("/totalGrade")
    public List<TotalMembershipDTO>getPaymentDetailsByUserId(@RequestParam String user_id) {
        List<TotalMembershipDTO> result = userMembershipService.getPaymentDetailsByUserId(user_id);
        System.out.println("등급반환 : "+result);
        return result;
    }
}
