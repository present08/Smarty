package com.green.smarty.mapper;

import com.green.smarty.vo.ReservationVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Mapper
public interface ReservationMapper {
    int register (ReservationVO vo);
    int modify (ReservationVO vo);
    void cancelReservation (String reservation_id);

    List<ReservationVO> getReservationsByCourtIdAndTime(
            @Param("court_id") String courtId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    List<Map<String, Object>> getReservationsByUserId(@Param("userId") String userId);

}
