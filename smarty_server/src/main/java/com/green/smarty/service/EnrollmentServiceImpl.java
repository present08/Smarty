package com.green.smarty.service;

import com.green.smarty.mapper.EnrollmentMapper;
import com.green.smarty.vo.EnrollmentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EnrollmentServiceImpl implements EnrollmentService{
    @Autowired
    private EnrollmentMapper enrollmentMapper;

    @Override
    public List<EnrollmentVO> getEnrollmentsByUserId(String userId) {
        return enrollmentMapper.getEnrollmentsByUserId(userId);
    }
}
