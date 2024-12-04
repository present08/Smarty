package com.green.smarty.mapper;

import com.green.smarty.dto.AdminAttendanceDTO;
import com.green.smarty.dto.AdminEnrollmentDTO;
import com.green.smarty.dto.AdminReservationDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminStatusMapper {
    List<AdminReservationDTO> getReservation(Map<String, Object> condition);
    List<AdminEnrollmentDTO> getEnrollment(Map<String, Object> condition);
    List<AdminAttendanceDTO> getAttendance(Map<String, Object> condition);
}
