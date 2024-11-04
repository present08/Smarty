package com.green.smarty.controller;

import com.green.smarty.dto.CourtDTO;
import com.green.smarty.dto.ProductDTO;
import com.green.smarty.service.CourtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/courts")
public class CourtController {

    @Autowired
    private CourtService courtService;

    @PostMapping("/")
    public String register(@ModelAttribute CourtDTO courtDTO) {
        log.info("컨트롤러 코트 등록! courtDTO = " + courtDTO);
        int id = courtService.register(courtDTO);
        log.info("등록된 코트 id = " + id + ", courtDTO = " + courtDTO);
        return "등록된 코트 id = " + id + ", courtDTO = " + courtDTO;
    }

    @GetMapping("/list")
    public List<CourtDTO> getList() {
        log.info("컨트롤러 코트 전체 조회!");
        List<CourtDTO> list = courtService.getList();
        return list;
    }

    @GetMapping("/{court_id}")
    public CourtDTO read(@PathVariable (name = "court_id") int court_id) {
        return courtService.read(court_id);
    }
}
