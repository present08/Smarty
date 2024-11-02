package com.green.smarty.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.mapper.ReservationMapper;
import com.green.smarty.vo.FacilityVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
    @Autowired
    private ReservationMapper reservationMapper;

    @GetMapping("/")
    public FacilityVO getFacility(@RequestParam String param) {
        System.out.println(param);
        FacilityVO vo = reservationMapper.getFacility(param);
        return vo;
    }
}