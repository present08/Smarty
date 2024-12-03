package com.green.smarty.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.green.smarty.dto.PermissionDTO;
import com.green.smarty.vo.AttendanceVO;
import com.green.smarty.vo.EnrollmentVO;
import com.green.smarty.vo.ReservationVO;

@Mapper
public interface AdminStatusMapper {
    List<ReservationVO> getReservation(String court_id);
    List<EnrollmentVO> getEnrollment(String class_id);
    List<AttendanceVO> getResAttendance(String reservation_id);
    List<AttendanceVO> getEnrAttendance(String enrollment_id);
    List<PermissionDTO> getPermission();
    void enrollment_update(String enrollment_id);
}
