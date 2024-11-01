package com.green.smarty.controller;

import com.green.smarty.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserReservations(@PathVariable String userId) {
        List<Map<String, Object>> reservations = reservationService.getReservationsByUserId(userId);
        return ResponseEntity.ok(reservations);
    }


}
