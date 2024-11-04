package com.green.smarty.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.green.smarty.vo.CourtVO;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;
import com.green.smarty.vo.UserVO;

@Mapper
public interface ReservationMapper {
    int insertFacility(FacilityVO facilityvo);
    int insertUser(UserVO vo);
    int insertReservation(ReservationVO vo);
    int insertCourt(CourtVO vo);
    FacilityVO getFacility(String facility_id);
    ReservationVO getReservation(String facility_id);
}
