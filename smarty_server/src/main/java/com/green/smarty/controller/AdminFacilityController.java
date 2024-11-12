package com.green.smarty.controller;

import com.green.smarty.dto.FacilityAdminDTO;
import com.green.smarty.service.AdminFacilityService;
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
    public String register(@ModelAttribute FacilityAdminDTO facilityAdminDTO) throws IOException {
        log.info("컨트롤러 시설 등록! facilityDTO = " + facilityAdminDTO);
        String id = adminFacilityService.register(facilityAdminDTO);
        log.info("등록된 시설 id = " + id + ", facilityDTO = " + facilityAdminDTO);

        return id;
    }

    // Read (시설 조회)
    @GetMapping("/list")
    public List<FacilityAdminDTO> getList() {
        log.info("컨트롤러 시설 전체 조회!");
        List<FacilityAdminDTO> list = adminFacilityService.getList();
        return list;
    }

    @GetMapping("/{facility_id}")
    public FacilityAdminDTO read(@PathVariable(name = "facility_id") String id) {
        log.info("컨트롤러 시설 하나 조회! id = " + id);
        return adminFacilityService.read(id);
    }

    // Update (시설 수정)
    @PutMapping("/{facility_id}")
    public FacilityAdminDTO modify(
            @PathVariable(name = "facility_id") String id,
            @RequestBody FacilityAdminDTO facilityAdminDTO) {
        log.info("컨트롤러 시설 수정! id = " + id);
        FacilityAdminDTO updateDTO = adminFacilityService.modify(facilityAdminDTO);
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
