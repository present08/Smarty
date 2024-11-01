package com.green.smarty.controller;

import com.green.smarty.service.RentalService;
import com.green.smarty.vo.RentalVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {
    @Autowired
    private RentalService rentalService;

    //수정 중
    @GetMapping("/status")
    public List<RentalVO> getProductRentalStatus(@RequestParam("facilityId") Long facilityId, @RequestParam("date") String date) {
        return rentalService.getProductRentalStatus(facilityId, date);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserRentals(@PathVariable String userId) {
        List<Map<String, Object>> rentals = rentalService.getRentalsByUserId(userId);
        return ResponseEntity.ok(rentals);
    }
}
