package com.green.smarty.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.smarty.mapper.ReservationMapper;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;

@Service
public class ReservationService {
    @Autowired
    private ReservationMapper reservationMapper;

    public List<Map<String, Integer>> createTimeBtn(String facility_id, String court_id, String date) {
        Map<String, String> getReservation = new HashMap<>();
        getReservation.put("facility_id", facility_id);
        getReservation.put("court_id", court_id);

        FacilityVO f_vo = reservationMapper.getFacility(facility_id);
        List<ReservationVO> r_vo = reservationMapper.getReservation(getReservation);

        int start = Integer.parseInt(f_vo.getOpen_time().split(":")[0]);
        int end = Integer.parseInt(f_vo.getClose_time().split(":")[0]);
        int default_time = f_vo.getDefault_time();
        int cnt = 0;
        List<Integer> list = new ArrayList<>();
        for (ReservationVO vo : r_vo) {
            if (vo.getReservation_start().toLocalDate().toString().equals(date)) {
                int start1 = Integer.parseInt(vo.getReservation_start().toLocalTime().toString().split(":")[0]);
                int end1 = Integer.parseInt(vo.getReservation_end().toLocalTime().toString().split(":")[0]);

                for (int i = 0; i < end1 - start1; i++) {
                    list.add(start1 + i);
                }
            }
        }
        List<Map<String, Integer>> timeBtn = new ArrayList<>();
        for (int i = 0; i < (end - start); i++) {
            Map<String, Integer> timeMap = new HashMap<>();
            timeMap.put("start", start + i);
            timeMap.put("end", start + i + 1);
            timeMap.put("id", cnt);
            timeMap.put("active", 0);
            if ((end - start) % default_time > (end - start) - i - 1 || list.contains(start + i)) {
                timeMap.put("disabled", 1);
            } else {
                timeMap.put("disabled", 0);
            }
            timeBtn.add(timeMap);
            if ((i + 1) % default_time == 0)
                cnt++;
        }
        return timeBtn;
    }

    public List<Map<String, Integer>> insertReservation(ReservationVO vo) {
        List<ReservationVO> selectVO = reservationMapper.getReservationAll();
        int last_id = Integer.parseInt(selectVO.get(selectVO.size() - 1).getReservation_id().split("_")[1]);

        vo.setReservation_id("R_" + String.format("%06d", last_id + 1));
        reservationMapper.insertReservation(vo);
        String date = vo.getReservation_start().toString().split("T")[0];

        List<Map<String, Integer>> result = createTimeBtn(vo.getFacility_id(), vo.getCourt_id(), date);

        return result;
    }

}
