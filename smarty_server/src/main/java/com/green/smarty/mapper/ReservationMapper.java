package com.green.smarty.mapper;

import java.util.List;
import java.util.Map;

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

    List<ReservationVO> getReservation(Map getReservation);

    List<ReservationVO> getReservationAll();
}
