package com.green.smarty.mapper.facility;

import com.green.smarty.vo.facility.CourtVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourtMapper {
    int register(CourtVO vo);                              // 코트 등록
    CourtVO findCourtById(String court_id);               // 코트 ID로 코트 검색
    int modify(CourtVO vo);                                // 코트 수정
    void removeCourt(String court_id);                     // 코트 삭제

    List<CourtVO> getAllCourts();                         // 모든 코트 조회

    // 특정 시설에 대한 모든 코트 정보를 가져오는 메서드
    @Select("SELECT * FROM court_tbl WHERE facility_id = #{facility_id}")
    List<CourtVO> getCourtsByFacilityId(@Param("facility_id") String facility_id); // 특정 시설에 대한 모든 코트 정보 가져오기
}