package com.green.smarty.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.green.smarty.dto.FacilityDTO;
import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.dto.ReservationUserDTO;
import com.green.smarty.vo.CourtVO;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;
import com.green.smarty.vo.UserVO;

@Mapper
public interface UserReservationMapper {
    int insertFacility(FacilityVO facilityvo);

    int insertUser(UserVO vo);

    int insertReservation(ReservationDTO dto);

    int insertCourt(CourtVO vo);

    FacilityVO getFacility(String facility_id);

    List<FacilityDTO> getFacilityOFCourt(); // facility + court

    List<FacilityVO> getFacilityAll(); // facility

    List<ReservationDTO> getReservation(Map getReservation);

    List<ReservationVO> getReservationAll();

    List<ReservationUserDTO> getReservationUserDate(String user_id);
}
