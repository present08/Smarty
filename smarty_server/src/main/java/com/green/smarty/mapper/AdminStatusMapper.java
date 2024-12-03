package com.green.smarty.mapper;

import com.green.smarty.dto.AdminEnrollmentDTO;
import com.green.smarty.dto.AdminReservationDTO;
import com.green.smarty.vo.AttendanceVO;
import com.green.smarty.vo.EnrollmentVO;
import com.green.smarty.vo.ReservationVO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminStatusMapper {
    List<AdminReservationDTO> getReservation(Map<String, Object> condition);
    List<AdminEnrollmentDTO> getEnrollment(Map<String, Object> condition);
}
