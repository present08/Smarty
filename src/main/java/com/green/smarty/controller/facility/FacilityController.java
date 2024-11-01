package com.green.smarty.controller.facility;

import com.green.smarty.mapper.facility.FacilityMapper;
import com.green.smarty.vo.facility.FacilityVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "http://localhost:3000")
public class    FacilityController {
    @Autowired
    private FacilityMapper facilityMapper;

    @GetMapping
    public List<FacilityVO> getAllFacilities() {
        return facilityMapper.getAllFacilities();
    }
}
