package com.green.smarty.service;

import com.green.smarty.vo.EnrollmentVO;

import java.util.List;

public interface EnrollmentService {
    List<EnrollmentVO> getEnrollmentsByUserId(String userId);
}
