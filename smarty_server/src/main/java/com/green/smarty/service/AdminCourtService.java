package com.green.smarty.service;

import com.green.smarty.mapper.AdminCourtMapper;
import com.green.smarty.vo.CourtVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AdminCourtService {
    @Autowired
    private AdminCourtMapper adminCourtMapper;

    // 코트 등록
    public List<String> register(List<CourtVO> courtList) {
        List<String> courtIdList = new ArrayList<>();

        for(int i = 0; i < courtList.size(); i++) {
            // 처리) 코트 id 생성하여 하나씩 매퍼로 전달
            //      : "C_" + 시설 id 마지막 4자리 + 01~
            String facility_id = courtList.get(i).getFacility_id();
            String idx = "";
            if( (i+1)-10 < 0 ) idx = "0" + (i+1);
            else idx = "i+1";
            String court_id = "C_" + facility_id.substring(12) + idx;
            System.out.println("코트 등록 처리) 생성된 코드 id = " + court_id);
            courtList.get(i).setCourt_id(court_id);
            courtIdList.add(court_id);
            adminCourtMapper.register(courtList.get(i));

        }
        return courtIdList;
    }

    public List<CourtVO> getList(String facility_id) {
        return adminCourtMapper.getList(facility_id);
    }

    public CourtVO read(String court_id) {
        return adminCourtMapper.read(court_id);
    }
}
