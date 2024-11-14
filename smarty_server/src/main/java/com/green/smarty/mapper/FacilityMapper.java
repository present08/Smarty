package com.green.smarty.mapper;

import com.green.smarty.vo.FacilityVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FacilityMapper {
    int insertFacility(FacilityVO vo);
    List<FacilityVO> getAllFacility();
    int updateFacility(FacilityVO vo);
    List<FacilityVO> getFacilityName();
}
