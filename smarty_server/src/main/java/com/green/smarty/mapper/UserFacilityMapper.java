package com.green.smarty.mapper;

import com.green.smarty.dto.FacilityDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface UserFacilityMapper {
    List<FacilityDTO> getAllFacilities();
    List<FacilityDTO> getFacilityById(String facility_id);
}
