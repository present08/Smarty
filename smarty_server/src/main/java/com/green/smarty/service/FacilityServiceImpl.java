package com.green.smarty.service;

import com.green.smarty.mapper.FacilityMapper;
import com.green.smarty.vo.FacilityVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service

public class FacilityServiceImpl implements FacilityService{
    @Autowired
    private FacilityMapper mapper;

    @Override
    public Long register(FacilityVO vo) {
        System.out.println("시설 확인"+vo);
        return mapper.register(vo);
    }

//    @Override
//    public List<FacilityVO> getAllFacilitys() {
//        List<FacilityVO> facilityList = mapper.getAllFacilitys();
//        return facilityList;
//    }

    @Override
    public List<FacilityVO> getAllFacilitys() {
        List<FacilityVO> facilityList = mapper.getAllFacilitys();
        log.info("Service에서 조회된 시설 목록: {}", facilityList);
        return facilityList;
    }

    @Override
    public List<FacilityVO> getFacilityName() {
        List<FacilityVO> facilityName = mapper.getFacilityName();
        return facilityName;
    }
}
