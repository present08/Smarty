package com.green.smarty.mapper;

import com.green.smarty.dto.AdminAttendanceDTO;
import com.green.smarty.dto.AdminEnrollmentDTO;
import com.green.smarty.dto.AdminReservationDTO;
import com.green.smarty.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminStatusMapper {
    List<AdminReservationDTO> getReservation(Map<String, Object> condition);
    List<AdminEnrollmentDTO> getEnrollment(Map<String, Object> condition);
    List<AdminAttendanceDTO> getAttendance(Map<String, Object> condition);
    List<UserVO> getNewUser(Map<String, LocalDate> condition);
}
