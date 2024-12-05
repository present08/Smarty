package com.green.smarty.controller;

import com.green.smarty.dto.TotalMembershipDTO;
import com.green.smarty.service.UserMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/membership")
public class MembershipController {

    @Autowired
    UserMembershipService userMembershipService;

    @GetMapping("/totalGrade")
    public float getPaymentDetailsByUserId(@RequestParam String user_id) {
        float totalAmount = userMembershipService.getPaymentDetailsByUserId(user_id);
        System.out.println("총 결제 금액 : " + totalAmount);
        return totalAmount;
    }
}
