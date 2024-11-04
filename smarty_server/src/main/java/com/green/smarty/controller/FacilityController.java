package com.green.smarty.controller;

import com.green.smarty.dto.FacilityDTO;
import com.green.smarty.service.FacilityService;
import com.green.smarty.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/facilities")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    // Create (시설 등록)
    @PostMapping("/")
    public String register(@ModelAttribute FacilityDTO facilityDTO) throws IOException {
        log.info("컨트롤러 시설 등록! facilityDTO = " + facilityDTO);
        String id = facilityService.register(facilityDTO);
        log.info("등록된 시설 id = " + id + ", facilityDTO = " + facilityDTO);
        return "등록된 시설 id = " + id + ", facilityDTO = " + facilityDTO;
    }

    // Read (시설 조회)
    @GetMapping("/list")
    public List<FacilityDTO> getList() {
        log.info("컨트롤러 시설 전체 조회!");
        List<FacilityDTO> list = facilityService.getList();
        return list;
    }

    @GetMapping("/{facility_id}")
    public FacilityDTO read(@PathVariable(name = "facility_id") String id) {
        log.info("컨트롤러 시설 하나 조회! id = " + id);
        return facilityService.read(id);
    }

    // Update (시설 수정)
    @PutMapping("/{facility_id}")
    public FacilityDTO modify(
            @PathVariable(name = "facility_id") String id,
            @RequestBody FacilityDTO facilityDTO) {
        log.info("컨트롤러 시설 수정! id = " + id);
        FacilityDTO updateDTO = facilityService.modify(facilityDTO);
        log.info("컨트롤러 수정 완료! updateDTO = " + updateDTO);
        return updateDTO;
    }

    // Delete (시설 삭제)
    @DeleteMapping("/{facility_id}")
    public String remove(@PathVariable(name = "facility_id") String id) {
        log.info("컨트롤러 시설 삭제! id = " + id);
        facilityService.remove(id);
        return "시설 삭제 완료";
    }
}
