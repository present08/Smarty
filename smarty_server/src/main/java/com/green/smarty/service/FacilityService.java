package com.green.smarty.service;

import com.green.smarty.mapper.FacilityMapper;
import com.green.smarty.vo.FacilityVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service

public class FacilityService {
    @Autowired
    private FacilityMapper mapper;

//    public Long register(FacilityVO vo) {
//        System.out.println("시설 확인" + vo);
//        return mapper.register(vo);
//    }

    public List<FacilityVO> getFacilityName() {
        List<FacilityVO> facilityName = mapper.getFacilityName();
        return facilityName;
    }
}
