package com.green.smarty.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.mapper.ReservationMapper;
import com.green.smarty.service.ReservationService;
import com.green.smarty.vo.FacilityDTO;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;
import com.green.smarty.vo.ResponseDTO;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
    @Autowired
    private ReservationMapper reservationMapper;

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/")
    public List<FacilityDTO> getFacilityVO() {
        List<FacilityDTO> facilityVO = reservationMapper.getFacilityOFCourt();
        System.out.println(facilityVO);
        return facilityVO;
    }

    @GetMapping("/{facility_id}")
    public List<Map<String, Integer>> getFacility(@PathVariable String facility_id, @RequestParam String court_id,
            @RequestParam String date) {
        System.out.println("date " + date);
        System.out.println("facility_id " + facility_id);
        System.out.println("court_id " + court_id);
        // FacilityVO vo = reservationMapper.getFacility(facility_id);
        List<Map<String, Integer>> btnData = reservationService.createTimeBtn(facility_id, court_id, date);
        System.out.println(btnData);
        // ResponseDTO result = ResponseDTO.builder()
        // .btnData(reservationVO)
        // .facilityVO(vo)
        // .build();
        return btnData;
    }

    @PostMapping("/{facility_id}")
    public List<Map<String, Integer>> dateToTime(@RequestBody ReservationVO vo) {
        List<Map<String, Integer>> result = reservationService.insertReservation(vo);
        return result;
    }

}