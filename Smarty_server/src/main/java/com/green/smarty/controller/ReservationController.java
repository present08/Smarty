package com.green.smarty.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.mapper.ReservationMapper;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
    @Autowired
    private ReservationMapper reservationMapper;

    @GetMapping("/{facility_id}")
    public FacilityVO getFacility(@PathVariable String facility_id, @RequestParam String court_id) {
        FacilityVO vo = reservationMapper.getFacility(facility_id);
        return vo;
    }

    @GetMapping("/")
    public ReservationVO getReservation(@RequestParam String facility_id){
        System.out.println(facility_id);
        ReservationVO vo = reservationMapper.getReservation(facility_id);
        return vo;
    }

}