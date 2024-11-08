package com.green.smarty.controller;

import com.green.smarty.service.FacilityService;
import com.green.smarty.vo.FacilityVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api")

public class FacilityController {
    @Autowired
    private FacilityService service;

    @GetMapping("/facilitys")
    public ResponseEntity<List<FacilityVO>> getFacility() {
        try {
            List<FacilityVO> facilities = service.getAllFacilitys();

            // 상세 로깅 추가
            facilities.forEach(facility -> {
                log.info("시설 정보: ID={}, Name={}, Price={}, DayRate={}, NightRate={}, OpenTime={}, CloseTime={}",
                        facility.getFacility_id(),
                        facility.getFacility_name(),
                        facility.getPrice(),
                        facility.getDay_rate(),
                        facility.getNight_rate(),
                        facility.getOpen_time(),
                        facility.getClose_time()
                );
            });

            return ResponseEntity.ok(facilities);
        } catch (Exception e) {
            log.error("시설 조회 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/facilitys")
    public ResponseEntity<String> postProduct(@RequestBody FacilityVO vo) {
        log.info("시설 등록 요청: {}", vo);
        Long facilityId = service.register(vo);
        return ResponseEntity.ok(facilityId + "번 등록 되었습니다");
    }
    @GetMapping("/facilitys/name")
    public List<FacilityVO> getFacilityName(@RequestBody FacilityVO vo) {
        List<FacilityVO> facilityName = service.getFacilityName();
        System.out.println("시설이름이 들어오는지");
        return facilityName;
    }
}
