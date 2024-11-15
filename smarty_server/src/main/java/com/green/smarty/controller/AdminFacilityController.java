package com.green.smarty.controller;

import com.green.smarty.service.AdminFacilityService;
import com.green.smarty.vo.FacilityVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/facilities")
public class AdminFacilityController {

    @Autowired
    private AdminFacilityService adminFacilityService;

    // Create (시설 등록)
    @PostMapping("/")
    public String register(@ModelAttribute FacilityVO facilityVO) throws IOException {
        log.info("컨트롤러 시설 등록! facilityVO = " + facilityVO);
        String id = adminFacilityService.register(facilityVO);
        log.info("등록된 시설 id = " + id + ", facilityDTO = " + facilityVO);
        System.out
                .println("======================================================================================" + id);

        return id;
    }

    // Read (시설 조회)
    @GetMapping("/list")
    public List<FacilityVO> getList() {
        List<FacilityVO> list = adminFacilityService.getList();
        log.info("컨트롤러 전체 시설 조회! : " + list);
        return list;
    }

    @GetMapping("/{facility_id}")
    public FacilityVO read(@PathVariable(name = "facility_id") String id) {
        log.info("컨트롤러 시설 하나 조회! id = " + id);
        return adminFacilityService.read(id);
    }

    // Update (시설 수정)
    @PutMapping("/{facility_id}")
    public FacilityVO modify(
            @PathVariable(name = "facility_id") String id,
            @RequestBody FacilityVO facilityVO) {
        log.info("컨트롤러 시설 수정! id = " + id);
        FacilityVO updateDTO = adminFacilityService.modify(facilityVO);
        log.info("컨트롤러 수정 완료! updateDTO = " + updateDTO);
        return updateDTO;
    }

    // Delete (시설 삭제)
    @DeleteMapping("/{facility_id}")
    public String remove(@PathVariable(name = "facility_id") String id) {
        log.info("컨트롤러 시설 삭제! id = " + id);
        adminFacilityService.remove(id);
        return "시설 삭제 완료";
    }

}
