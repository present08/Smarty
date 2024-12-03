package com.green.smarty.controller;

import com.green.smarty.dto.AdminReservationDTO;
import com.green.smarty.dto.AdminStatusDTO;
import com.green.smarty.service.AdminStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/status")
public class AdminStatusController {
    @Autowired
    private AdminStatusService adminStatusService;

    // Read
    // 선택한 시설의 예약, 수강 신청 현황 및 이용자별 출결 조회
    @GetMapping("/{facility_id}")
    public AdminStatusDTO getStatus(
            @PathVariable(name = "facility_id") String facility_id,
            @RequestParam("date") String date) {
        LocalDateTime current = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("시설 이용 현황 조회! current = " + current);
        return adminStatusService.getStatus(facility_id, current);
    }
}
