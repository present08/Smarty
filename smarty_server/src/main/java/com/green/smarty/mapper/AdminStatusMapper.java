package com.green.smarty.mapper;

import com.green.smarty.dto.FacilityStatusDTO;
import com.green.smarty.vo.AttendanceVO;
import com.green.smarty.vo.EnrollmentVO;
import com.green.smarty.vo.ReservationVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminStatusMapper {
    List<ReservationVO> getReservation(String court_id);
    List<EnrollmentVO> getEnrollment(String class_id);
    List<AttendanceVO> getResAttendance(String reservation_id);
    List<AttendanceVO> getEnrAttendance(String enrollment_id);
}
