package com.green.smarty.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.mapper.ReservationMapper;
import com.green.smarty.service.ReservationService;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;
import com.green.smarty.vo.ResponseDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
    @Autowired
    private ReservationMapper reservationMapper;

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/{facility_id}")
    public ResponseDTO getFacility(@PathVariable String facility_id, @RequestParam String court_id,
            @RequestParam String date) {
        FacilityVO vo = reservationMapper.getFacility(facility_id);
        List<Map<String, Integer>> reservationVO = reservationService.createTimeBtn(facility_id, court_id, date);
        ResponseDTO result = ResponseDTO.builder()
                .btnData(reservationVO)
                .facilityVO(vo)
                .build();
        return result;
    }

    @PostMapping("/{facility_id}")
    public String dateToTime(@RequestBody ReservationVO vo) {
        String result = reservationService.insertReservation(vo);
        return result;
    }

}