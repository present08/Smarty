package com.green.smarty.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.green.smarty.vo.FacilityVO;

@Mapper
public interface ReservationMapper {
    int insertFacility(FacilityVO facilityvo);
    FacilityVO getFacility(String facility_name);
}
