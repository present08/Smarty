package com.green.smarty.controller;

import com.green.smarty.dto.RentalDTO;
import com.green.smarty.service.AdminRentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/rentals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminRentalController {
    @Autowired
    private AdminRentalService adminRentalService;

    @GetMapping("/{product_id}")
    public ResponseEntity<List<RentalDTO>> getRentalsByProductId(@PathVariable String product_id) {
        try {
            List<RentalDTO> rentals = adminRentalService.getRentalsByProductId(product_id);
            return ResponseEntity.ok(rentals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
