package com.green.smarty.controller;

import com.green.smarty.dto.CourtAdminDTO;
import com.green.smarty.service.AdminCourtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/courts")
public class AdminCourtController {
    @Autowired
    private AdminCourtService adminCourtService;

    @PostMapping("/")
    public String register(@RequestBody List<CourtAdminDTO> courtList) {
        log.info("컨트롤러 코트 등록 리스트! courtList = " + courtList);
        adminCourtService.register(courtList);
        return "코트 등록 성공";
    }

    @GetMapping("/list")
    public List<CourtAdminDTO> getList() {
        log.info("컨트롤러 코트 전체 조회!");
        List<CourtAdminDTO> list = adminCourtService.getList();
        return list;
    }

    @GetMapping("/{court_id}")
    public CourtAdminDTO read(@PathVariable (name = "court_id") int court_id) {
        return adminCourtService.read(court_id);
    }

}