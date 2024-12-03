package com.green.smarty.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.smarty.mapper.UserClassMapper;
import com.green.smarty.vo.ClassDetailVO;
import com.green.smarty.vo.EnrollmentVO;

@Service
public class UserClassService {

    @Autowired
    private UserClassMapper userClassMapper;

    public Map<String, List<String>> getClassWeekday() {
        List<ClassDetailVO> detail = userClassMapper.getClassDetail();
        // 데이터를 받아서 중복제거 후
        Map<String, List<String>> result = detail.stream()
                .collect(Collectors.groupingBy(
                        ClassDetailVO::getClass_id,
                        Collectors.mapping(ClassDetailVO::getWeekday, Collectors.toList())));
        // 월요일부터 재배열
        result = result.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().stream().distinct().collect(Collectors.toList())));

        return result;
    }

    public String classEnrollment(Map<String, String> enrollData) {
        List<EnrollmentVO> enroll = userClassMapper.getEnrollment();
        List<EnrollmentVO> enrollList = new ArrayList<>();
        LocalDate date = LocalDate.now();
        for (EnrollmentVO i : enroll) {
            if (i.getEnrollment_id().substring(2, 10).equals(date.format(DateTimeFormatter.ofPattern("yyyyMMdd")))) {
                enrollList.add(i);
            }
        }
        String id = "E_" + date.getYear() + date.getMonthValue()
                + (date.getDayOfMonth() > 10 ? date.getDayOfMonth() : "0" + date.getDayOfMonth())
                + String.format("%03d", enroll.size() == 0 ? 1 : enroll.size() + 1);
        enrollData.put("enrollment_id", id);
        EnrollmentVO vo = EnrollmentVO.builder()
                .class_id(enrollData.get("class_id"))
                .enrollment_id(id)
                .user_id(enrollData.get("user_id"))
                .enrollment_status("결제대기")
                .build();
        userClassMapper.classEnroll(vo);
        System.out.println(id);
        return id;
    }
}
