package com.green.smarty.service.facility;

import com.green.smarty.mapper.facility.FacilityMapper;
import com.green.smarty.vo.facility.FacilityVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FacilityService {
    @Autowired
    private FacilityMapper facilityMapper;

    public List<FacilityVO> getAllFacilities(){
        return facilityMapper.getAllFacilities();
    }
}
