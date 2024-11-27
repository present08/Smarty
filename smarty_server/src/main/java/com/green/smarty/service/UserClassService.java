package com.green.smarty.service;

import java.time.LocalDate;
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
        Map<String, List<String>> result = detail.stream()
                .collect(Collectors.groupingBy(
                        ClassDetailVO::getClass_id,
                        Collectors.mapping(ClassDetailVO::getWeekday, Collectors.toList())));

        result = result.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().stream().distinct().collect(Collectors.toList())));

        return result;
    }

    public String classEnrollment(Map<String, String> enrollData) {
        List<EnrollmentVO> enroll = userClassMapper.getEnrollment();
        LocalDate date = LocalDate.now();
        String id = "E_" + date.getYear() + date.getMonthValue() + date.getDayOfMonth()
                + String.format("%03d", enroll.size() == 0 ? 1 : enroll.size() + 1);
        enrollData.put("enrollment_id", id);
        userClassMapper.classEnroll(enrollData);
        System.out.println(id);
        return id;
    }
}
