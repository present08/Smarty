package com.green.smarty.controller;

import com.green.smarty.dto.TotalMembershipDTO;
import com.green.smarty.service.UserMembershipService;
import com.green.smarty.vo.MembershipVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/membership")
public class MembershipController {

    @Autowired
    UserMembershipService userMembershipService;

    @GetMapping("/totalGrade")
    public float getPaymentDetailsByUserId(@RequestParam String user_id) {
        float totalAmount = userMembershipService.getPaymentDetailsByUserId(user_id);
        System.out.println("총 결제 금액 : " + totalAmount);
        return totalAmount;
    }

    @GetMapping("/memberGrade")
    public List<MembershipVO> getUserMemberGrade(@RequestParam("user_id") String user_id) {
        System.out.println("Received user_id: " + user_id);
        List<MembershipVO> result = userMembershipService.getUserMembergrade(user_id);
        return result;
    }


}
