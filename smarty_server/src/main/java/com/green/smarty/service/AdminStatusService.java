package com.green.smarty.service;

import com.green.smarty.dto.AdminAttendanceDTO;
import com.green.smarty.dto.AdminEnrollmentDTO;
import com.green.smarty.dto.AdminReservationDTO;
import com.green.smarty.dto.AdminStatusDTO;
import com.green.smarty.mapper.AdminClassMapper;
import com.green.smarty.mapper.AdminCourtMapper;
import com.green.smarty.mapper.AdminStatusMapper;
import com.green.smarty.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AdminStatusService {
    @Autowired
    private AdminStatusMapper adminStatusMapper;
    @Autowired
    private AdminCourtMapper adminCourtMapper;
    @Autowired
    private AdminClassMapper adminClassMapper;

    // Read
    // 선택한 시설의 예약, 수강 신청 현황
    public AdminStatusDTO getStatus(String facility_id, LocalDate date) {
        // 검색 조건 설정
        Map<String, Object> condition = new HashMap<>();
        condition.put("facility_id", facility_id);
        condition.put("date", date);
        List<AdminReservationDTO> reservationList = adminStatusMapper.getReservation(condition);
        List<AdminEnrollmentDTO> enrollmentList = adminStatusMapper.getEnrollment(condition);
        System.out.println("예약 : " + reservationList);
        System.out.println("수강 : " + enrollmentList);

        AdminStatusDTO adminStatusDTO = AdminStatusDTO.builder()
                .reservationDTOList(reservationList)
                .enrollmentDTOList(enrollmentList)
                .build();
        return adminStatusDTO;
    }

    public List<AdminAttendanceDTO> getAttendance(String class_id, LocalDate date) {
        // 검색 조건 설정
        Map<String, Object> condition = new HashMap<>();
        condition.put("class_id", class_id);
        condition.put("date", date);
        List<AdminAttendanceDTO> attendanceList = adminStatusMapper.getAttendance(condition);
        System.out.println("출결 : " + attendanceList);
        return attendanceList;
    }

}
