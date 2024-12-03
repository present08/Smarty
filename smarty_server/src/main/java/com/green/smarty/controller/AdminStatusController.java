package com.green.smarty.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.dto.FacilityStatusDTO;
import com.green.smarty.dto.PermissionDTO;
import com.green.smarty.service.AdminStatusService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/status")
public class AdminStatusController {
    @Autowired
    private AdminStatusService adminStatusService;

    // Read
    // 선택한 시설의 예약, 수강 신청 현황 및 이용자별 출결 조회
    @GetMapping("/{facility_id}")
    public FacilityStatusDTO getStatus(@PathVariable(name = "facility_id") String facility_id) {
        System.out.println("시설 이용 현황 조회! facility_id = " + facility_id);
        return adminStatusService.getStatus(facility_id);
    }

    // muam e 77ㅓ
    @GetMapping("/permission")
    public List<PermissionDTO> getPermission() {
        List<PermissionDTO> dto = adminStatusService.getPermission();
        return dto;
    }

    @PostMapping("/permissionPost")
    public List<PermissionDTO> permissionData(@RequestBody String enrollment_id) {
        System.out.println(enrollment_id);
        adminStatusService.update_enrollment(enrollment_id);
        List<PermissionDTO> dto = adminStatusService.getPermission();
        return dto;
    }

}
