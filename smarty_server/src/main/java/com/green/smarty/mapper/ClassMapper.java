package com.green.smarty.mapper;

import com.green.smarty.vo.ClassVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalTime;
import java.util.List;

@Mapper
public interface ClassMapper {
    int register (ClassVO vo);
    int modify (ClassVO vo);
    int removeClass (String class_id);

    int countClassOverlap(@Param("facilityId") String facility_id,
                          @Param("className") String class_name,
                          @Param("day") String day,
                          @Param("startTime") String start_time, // LocalTime을 String으로 변환
                          @Param("endTime") String end_time); // LocalTime을 String으로 변환

    List<ClassVO> getAllClasses();
}
