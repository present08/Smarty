package com.green.smarty.mapper.facility;

import com.green.smarty.vo.facility.FacilityVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface FacilityMapper {
    int register(FacilityVO vo);
    FacilityVO findFacillityById(String facility_id);
    int modify (FacilityVO vo);
    void removeFacillity(String facility_id);

    List<FacilityVO> getAllFacilities();

    @Select("SELECT facility_id FROM facility_tbl")
    List<String> getAllFacilityIds(); // 모든 시설 ID를 가져오는 메서드 추가

    @Select("SELECT open_time, close_time FROM facility_tbl WHERE facility_id = #{facility_id}")
    FacilityVO getOperatingHours(String facility_id);
}
