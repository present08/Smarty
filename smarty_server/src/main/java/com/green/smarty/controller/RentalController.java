package com.green.smarty.controller;

import com.green.smarty.service.RentalService;
import com.green.smarty.vo.RentalVO;
import com.green.smarty.vo.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")

public class RentalController {
    @Autowired
    private RentalService service;

    @GetMapping("/rentals")
    public ResponseEntity<List<RentalVO>> getRental() {
        try {
            List<RentalVO> rentals = service.getAllRentals();
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

        try {
            // 사용자 존재 여부 확인
            if (vo.getUser_id() == null) {
                return ResponseEntity.badRequest().body("사용자 ID가 없습니다.");
            }

            // 상품 존재 여부 확인
            if (vo.getProduct_id() == null) {
                return ResponseEntity.badRequest().body("상품 ID가 없습니다.");
            }

            // 대여 처리
            Long rentalId = service.register(vo);
            return ResponseEntity.ok("대여가 완료되었습니다. 대여 번호: " + rentalId);

        } catch (Exception e) {
            log.error("대여 처리 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("대여 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @PutMapping("/rentals/{rental_id}/return")
    public ResponseEntity<String> returnRental(@PathVariable Long rental_id) {
        try {
            int updatedRows = service.returnRental(rental_id);
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
    public ResponseEntity<RentalVO> getRentalById(@PathVariable Long rental_id) {
        log.info("Received request for rental_id: {}", rental_id);  // 로그 추가
        try {
            RentalVO rental = service.getRentalById(rental_id);

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
