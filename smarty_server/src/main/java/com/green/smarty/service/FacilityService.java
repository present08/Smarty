package com.green.smarty.service;

import com.green.smarty.vo.FacilityVO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FacilityService {
    Long register(FacilityVO vo);
    public List<FacilityVO> getAllFacilitys();
    public List<FacilityVO> getFacilityName();
}
