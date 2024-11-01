package com.green.smarty.mapper;

import com.green.smarty.vo.EnrollmentVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EnrollmentMapper {
    int register (EnrollmentVO vo);
    int modify (EnrollmentVO vo);
    int cancelEnroll (String Enrollment_id);

    List<EnrollmentVO> getEnrollmentsByUserId(@Param("userId") String userId);

}
