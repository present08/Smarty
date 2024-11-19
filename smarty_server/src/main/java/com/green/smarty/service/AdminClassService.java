package com.green.smarty.service;

import com.green.smarty.dto.ClassAdminDTO;
import com.green.smarty.mapper.AdminClassMapper;
import com.green.smarty.vo.ClassDetailVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@Transactional
public class AdminClassService {
    @Autowired
    private AdminClassMapper adminClassMapper;

    // 클래스 등록 시의 비즈니스 로직 처리
    public void register(List<ClassAdminDTO> classList) {

        for(int i = 0; i < classList.size(); i++) {
            // 처리1) class_id 생성 : "C_" + 시설 id 마지막 4자리 + 01
            String facility_id = classList.get(i).getFacility_id();
            String idx = "";
            if( (i+1)-10 < 0 ) idx = "0" + (i+1);
            else idx = "i+1";
            String class_id = "C_" + facility_id.substring(12) + idx;
            classList.get(i).setClass_id(class_id);
            System.out.println("서비스 처리1) 클래스 id 생성 : " + class_id);
            adminClassMapper.register(classList.get(i));

            // 처리2-1) weekday, class_data 생성
            List<String> weekdaySet = classList.get(i).getWeekday();
            System.out.println("서비스 처리2-1) weekdaySet : " + weekdaySet);

            LocalDate start_date = classList.get(i).getStart_date();
            LocalDate end_date = classList.get(i).getEnd_date();
            LocalDate current_date = start_date;

            List<LocalDate> class_date = new ArrayList<>();
            List<String> weekday = new ArrayList<>();

            while (current_date.compareTo(end_date) <= 0) {

                // step1) current_date 의 DayOfWeek 객체 생성 및 요일 추출
                DayOfWeek current = current_date.getDayOfWeek();
                String currentS = current.getDisplayName(TextStyle.FULL, Locale.getDefault());

                // step2) 지정된 요일과 일치하는 경우 schedule 맵에 담기
                // key: 수업 날짜, value: 수업 요일
                for (String day : weekdaySet) {
                    if (currentS.equals(day)) {
                        class_date.add(current_date);
                        weekday.add(day);
                    }
                }
                // step3) 날짜 하루 증가시키기
                current_date = current_date.plusDays(1);
            }
            System.out.println("서비스 처리 2-1) 생성된 class_date : " + class_date);
            System.out.println("서비스 처리 2-1) 생성된 weekday : " + weekday);

            // 처리2-2) class_detail 등록
            for(int j = 0; j < class_date.size(); j++) {
                ClassDetailVO classDetailVO = ClassDetailVO.builder()
                        .class_id(class_id)
                        .weekday(weekday.get(j))
                        .class_date(class_date.get(j))
                        .build();
                adminClassMapper.registerDetail(classDetailVO);
            }
        }
    }

    public List<ClassAdminDTO> getList() {
        return adminClassMapper.getList();
    }

//    public ClassAdminDTO read(String class_id) {
//        return adminClassMapper.read(class_id);
//    }
}
