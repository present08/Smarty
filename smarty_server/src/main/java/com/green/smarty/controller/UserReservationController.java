package com.green.smarty.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.green.smarty.dto.FacilityDTO;
import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.mapper.UserReservationMapper;
import com.green.smarty.service.UserReservationService;

@RestController
@RequestMapping("/api/user/reservation")
public class UserReservationController {
    @Autowired
    private UserReservationMapper reservationMapper;

    @Autowired
    private UserReservationService reservationService;

    // 시설 이미지 불러오기
    @GetMapping("/uploads/{fileName}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) throws MalformedURLException {
        Path filePath = Paths.get("C:/Users/Administrator/Desktop/Green_Project/Smarty/smarty_server/upload/")
                .resolve(fileName);
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() && resource.isReadable()) {
            return ResponseEntity.ok().body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 시설 정보 불러오기
    @GetMapping("/")
    public List<FacilityDTO> getFacilityVO() {
        List<FacilityDTO> dto = reservationService.getFacility();
        return dto;
    }

    @GetMapping("/{facility_id}")
    public List<Map<String, Integer>> getFacility(@PathVariable String facility_id, @RequestParam String court_id,
            @RequestParam String date) {
        System.out.println("date " + date);
        System.out.println("facility_id " + facility_id);
        System.out.println("court_id " + court_id);
        List<Map<String, Integer>> btnData = reservationService.createTimeBtn(facility_id, court_id, date);
        return btnData;
    }

    // 예약 완료 시 호출
    @PostMapping("/{facility_id}")
    public List<Map<String, Integer>> dateToTime(@RequestBody ReservationDTO dto) {
        List<Map<String, Integer>> result = reservationService.insertReservation(dto);
        System.out.println(dto);
        return result;
    }

}