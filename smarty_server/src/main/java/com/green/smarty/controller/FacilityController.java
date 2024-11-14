package com.green.smarty.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.mapper.FacilityMapper;
import com.green.smarty.service.FacilityService;
import com.green.smarty.vo.FacilityVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/product")

public class FacilityController {
    @Autowired
    private FacilityService FacilityService;

    @Autowired
    private FacilityMapper facilityMapper;

    @GetMapping("/facility")
    public List<FacilityVO> getFacility() {
        List<FacilityVO> facilityVO = facilityMapper.getAllFacility();
        return facilityVO;
    }

    // @PostMapping("/facilitys")
    // public ResponseEntity<String> postProduct(@RequestBody FacilityVO vo) {
    // log.info("시설 등록 요청: {}", vo);
    // Long facilityId = service.register(vo);
    // return ResponseEntity.ok(facilityId + "번 등록 되었습니다");
    // }

    // @GetMapping("/facilitys/name")
    // public List<FacilityVO> getFacilityName(@RequestBody FacilityVO vo) {
    // List<FacilityVO> facilityName = service.getFacilityName();
    // System.out.println("시설이름이 들어오는지");
    // return facilityName;
    // }
}
