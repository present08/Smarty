package com.green.smarty.controller.facility.user;

import com.green.smarty.service.facility.FacilityService;
import com.green.smarty.vo.facility.FacilityVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user/facilities")
@CrossOrigin(origins = "http://localhost:3000")
public class UserFacilityController {
    @Autowired
    private FacilityService facilityService;

    @GetMapping
    public List<FacilityVO> getAllFacilities(){
        return facilityService.getAllFacilities();
    }
}