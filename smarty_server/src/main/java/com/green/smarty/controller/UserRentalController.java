package com.green.smarty.controller;

import com.green.smarty.service.UserRentalService;

import com.green.smarty.dto.RentalDTO;
import com.green.smarty.vo.RentalVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")

public class UserRentalController {
    @Autowired
    private UserRentalService userRentalService;

    @GetMapping("/rentals")
    public ResponseEntity<List<RentalDTO>> getRental() {
        try {
            List<RentalDTO> rentals = userRentalService.getAllRentals();
            System.out.println("렌탈이 들어오는지"+rentals);
            return new ResponseEntity<>(rentals, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching rentals: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/rentals")
    public ResponseEntity<?> postRental(@RequestBody RentalVO vo) {
        log.info("Received rental data: {}", vo);
        log.info("User ID: {}", vo.getUser_id());
        log.info("Product ID: {}", vo.getProduct_id());
        log.info("Rental Date: {}", vo.getRental_date());
        log.info("Return Date: {}", vo.getReturn_date());

        try {
            if (vo.getUser_id() == null || vo.getUser_id().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("사용자 ID가 없습니다.");
            }

            if (vo.getProduct_id() == null || vo.getProduct_id().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("상품 ID가 없습니다.");
            }

            if (vo.getRental_date() == null || vo.getReturn_date() == null) {
                return ResponseEntity.badRequest().body("대여일 또는 반납일이 없습니다.");
            }

            int rentalId = userRentalService.insertRental(vo);

            return ResponseEntity.ok()
                    .body(Map.of(
                            "message", "대여가 완료되었습니다.",
                            "rental_id", rentalId
                    ));

        } catch (Exception e) {
            log.error("대여 처리 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("대여 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @PutMapping("/rentals/{rental_id}/return")
    public ResponseEntity<String> returnRental(@PathVariable String rental_id) {
        try {
            int updatedRows = userRentalService.returnRental(rental_id);
            if (updatedRows > 0) {
                return new ResponseEntity<>("반납 완료", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("반납 실패: 해당 렌탈이 존재하지 않습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("반납 처리 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/rentals/{rental_id}")
    public ResponseEntity<RentalDTO> getRentalById(@PathVariable String rental_id) {
        log.info("Received request for rental_id: {}", rental_id);  // 로그 추가
        try {
            RentalDTO rental = userRentalService.getRentalById(rental_id);

            if (rental != null) {
                return new ResponseEntity<>(rental, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
