package com.green.smarty.controller;

import com.green.smarty.dto.AdminAttendanceDTO;
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
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/status")
public class AdminStatusController {
    @Autowired
    private AdminStatusService adminStatusService;

    // Read
    // 선택한 시설의 예약, 수강 신청 현황
    @GetMapping("/{facility_id}")
    public AdminStatusDTO getStatus(
            @PathVariable(name = "facility_id") String facility_id,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        System.out.println("시설 이용 현황 조회! date = " + date);
        return adminStatusService.getStatus(facility_id, date);
    }
    // 클래스 출결 현황
    @GetMapping("/attendance/{class_id}")
    public List<AdminAttendanceDTO> getAttendance(
            @PathVariable(name = "class_id") String class_id,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        System.out.println("클래스 출결 조회! date = " + date);
        return adminStatusService.getAttendance(class_id, date);
    }
}
