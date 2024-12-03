package com.green.smarty.service;

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
    // 선택한 시설의 예약, 수강 신청 현황 및 이용자별 출결 조회
    public AdminStatusDTO getStatus(String facility_id, LocalDateTime current) {
        Map<String, Object> condition = new HashMap<>();
        condition.put("facility_id", facility_id);
        condition.put("current", current);
        condition.put("end", current.plusDays(1));
        List<AdminReservationDTO> reservationList = adminStatusMapper.getReservation(condition);
        List<AdminEnrollmentDTO> enrollmentList = adminStatusMapper.getEnrollment(condition);
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        for(AdminEnrollmentDTO dto : enrollmentList) {
            if(currentDate.isBefore(dto.getStart_date())) dto.setStatus("개강 전");
            else if(!currentDate.isBefore(dto.getStart_date()) && !currentDate.isAfter(dto.getEnd_date())) {
                // 개강중인 강의 -> 현재 시간과 비교하여 수업 상태 설정
//                if(currentTime.isBefore(dto.getStart_time())) dto.setStatus("수업 전");
//                else if(currentTime.isAfter(dto.getEnd_time())) dto.setStatus("수업 종료");
//                else dto.setStatus("수업중");
                dto.setStatus("개강중");
            } else if(currentDate.isAfter(dto.getEnd_date())) dto.setStatus("종강");
        }
        AdminStatusDTO adminStatusDTO = AdminStatusDTO.builder()
                .reservationDTOList(reservationList)
                .enrollmentDTOList(enrollmentList)
                .build();
        return adminStatusDTO;
    }
}
