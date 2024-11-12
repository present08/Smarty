package com.green.smarty.mapper;

import java.util.List;
import java.util.Map;

<<<<<<< HEAD:Smarty_server/src/main/java/com/green/smarty/mapper/UserReservationMapper.java
import org.apache.ibatis.annotations.Mapper;

import com.green.smarty.dto.FacilityDTO;
import com.green.smarty.dto.ReservationDTO;
=======
import com.green.smarty.dto.FacilityDTO;
import org.apache.ibatis.annotations.Mapper;

import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.dto.ReservationUserDTO;
>>>>>>> main:smarty_server/src/main/java/com/green/smarty/mapper/UserReservationMapper.java
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
<<<<<<< HEAD:Smarty_server/src/main/java/com/green/smarty/mapper/UserReservationMapper.java
=======

    List<ReservationUserDTO> getReservationUserDate(String user_id);
>>>>>>> main:smarty_server/src/main/java/com/green/smarty/mapper/UserReservationMapper.java
}
