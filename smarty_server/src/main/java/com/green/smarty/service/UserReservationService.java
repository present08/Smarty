package com.green.smarty.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.dto.ReservationUserDTO;
import com.green.smarty.mapper.UserReservationMapper;
import com.green.smarty.vo.FacilityVO;
import com.green.smarty.vo.ReservationVO;

@Service
public class UserReservationService {
    @Autowired
    private UserReservationMapper reservationMapper;

    // open, close, default time을 기준으로 버튼 생성 및
    // reservation Table에 데이터가 있으면 버튼 비활성화로 변경
    public List<Map<String, Integer>> createTimeBtn(String facility_id, String court_id, String date) {
        System.out.println("=========== Service: Create Btn ==============");
        System.out.println("facility_id  " + facility_id);
        System.out.println("court_id  " + court_id);
        System.out.println("date  " + date);
        Map<String, String> getReservation = new HashMap<>();
        getReservation.put("facility_id", facility_id);
        getReservation.put("court_id", court_id);

        FacilityVO f_vo = reservationMapper.getFacility(facility_id);
        List<ReservationDTO> r_vo = reservationMapper.getReservation(getReservation);

        int start = Integer.parseInt(f_vo.getOpen_time().split(":")[0]);
        int end = Integer.parseInt(f_vo.getClose_time().split(":")[0]);
        int default_time = f_vo.getDefault_time();
        int cnt = 0;
        List<Integer> list = new ArrayList<>();
        for (ReservationDTO vo : r_vo) {
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

    public List<Map<String, Integer>> insertReservation(ReservationDTO dto) {
        List<ReservationVO> selectVO = reservationMapper.getReservationAll();
        String nowDate = "" + LocalDate.now().getYear() + LocalDate.now().getMonthValue()
                + LocalDate.now().getDayOfMonth();
        int last_id = 0;
        try {
            if (selectVO.get(selectVO.size() - 1).getReservation_id().substring(2, 10).equals(nowDate)) {
                last_id = Integer.parseInt(selectVO.get(selectVO.size() - 1).getReservation_id().substring(10));
            } else {
                last_id = 0;
            }
        } catch (Exception e) {
            last_id = 0;
        }
        dto.setReservation_id("R_" + nowDate + String.format("%02d", last_id + 1));
        reservationMapper.insertReservation(dto);
        String date = dto.getReservation_start().toString().split("T")[0];

        List<Map<String, Integer>> result = createTimeBtn(dto.getFacility_id(), dto.getCourt_id(), date);

        return result;
    }

    public List<ReservationUserDTO> getReservationUserDate(String user_id) {
        List<ReservationUserDTO> result = reservationMapper.getReservationUserDate(user_id);
        return result;
    }

}
