package com.green.smarty.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.green.smarty.dto.FacilityStatusDTO;
import com.green.smarty.dto.PermissionDTO;
import com.green.smarty.mapper.AdminClassMapper;
import com.green.smarty.mapper.AdminCourtMapper;
import com.green.smarty.mapper.AdminStatusMapper;
import com.green.smarty.vo.AttendanceVO;
import com.green.smarty.vo.ClassVO;
import com.green.smarty.vo.CourtVO;
import com.green.smarty.vo.EnrollmentVO;
import com.green.smarty.vo.ReservationVO;

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
    public FacilityStatusDTO getStatus(String facility_id) {

        // 처리1 : 시설별 코트 리스트 조회 -> 각 코트별로 예약 내역 조회 -> 예약별 출결조회
        List<CourtVO> courtList = adminCourtMapper.getList(facility_id);
        Map<String, List<ReservationVO>> allReservation = new HashMap<>();
        Map<String, List<AttendanceVO>> resAttendance = new HashMap<>();
        for (CourtVO courtVO : courtList) {
            List<ReservationVO> reservationList = adminStatusMapper.getReservation(courtVO.getCourt_id());
            allReservation.put(courtVO.getCourt_id(), reservationList);
            for (ReservationVO reservationVO : reservationList) {
                List<AttendanceVO> attendanceList = adminStatusMapper
                        .getResAttendance(reservationVO.getReservation_id());
                resAttendance.put(reservationVO.getReservation_id(), attendanceList);
            }
        }

        // 처리2 : 시설별 강의 리스트 조회 -> 각 강의별 수강신청 내역 조회 -> 예약별 출결조회
        List<ClassVO> classList = adminClassMapper.getList(facility_id);
        Map<String, List<EnrollmentVO>> allEnrollment = new HashMap<>();
        Map<String, List<AttendanceVO>> enrAttendance = new HashMap<>();
        for (ClassVO classVO : classList) {
            List<EnrollmentVO> enrollmentList = adminStatusMapper.getEnrollment(classVO.getClass_id());
            allEnrollment.put(classVO.getClass_id(), enrollmentList);
            for (EnrollmentVO enrollmentVO : enrollmentList) {
                List<AttendanceVO> attendanceList = adminStatusMapper.getEnrAttendance(enrollmentVO.getEnrollment_id());
                enrAttendance.put(enrollmentVO.getEnrollment_id(), attendanceList);
            }
        }

        // 처리3 : FacilityStatusDTO 구성
        FacilityStatusDTO facilityStatusDTO = FacilityStatusDTO.builder()
                .allReservation(allReservation)
                .allEnrollment(allEnrollment)
                .resAttendance(resAttendance)
                .enrAttendance(enrAttendance)
                .build();

        return facilityStatusDTO;
    }

    // muam i 77ㅓ
    public List<PermissionDTO> getPermission() {
        List<PermissionDTO> dto = adminStatusMapper.getPermission();
        return dto;
    }

    public void update_enrollment(String enrollment_id) {
        adminStatusMapper.enrollment_update(enrollment_id);
    }
}