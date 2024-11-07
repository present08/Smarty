package com.green.smarty.mapper;

import java.util.List;
import java.util.Map;

import com.green.smarty.vo.*;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReservationMapper {
    int insertFacility(FacilityVO facilityvo);

    int insertUser(UserVO vo);

    int insertReservation(ReservationVO vo);

    int insertCourt(CourtVO vo);

    FacilityVO getFacility(String facility_id);

    List<ReservationVO> getReservation(Map getReservation);

    List<ReservationVO> getReservationAll();

    List<ReservationUserDTO> getReservationUserDate(String user_id);
}
