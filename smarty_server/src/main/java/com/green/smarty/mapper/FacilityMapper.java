package com.green.smarty.mapper;

import com.green.smarty.vo.FacilityVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface FacilityMapper {
    Long register(FacilityVO vo);
    List<FacilityVO> getAllFacilitys();
    int updateFacility(FacilityVO vo);
    List<FacilityVO> getFacilityName();
}
