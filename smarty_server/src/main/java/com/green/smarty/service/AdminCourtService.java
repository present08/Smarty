package com.green.smarty.service;

import com.green.smarty.mapper.AdminCourtMapper;
import com.green.smarty.vo.CourtVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Log4j2
public class AdminCourtService {
    @Autowired
    private AdminCourtMapper adminCourtMapper;

    // 코트 등록 시의 비즈니스 로직 처리
    public void register(List<CourtVO> courtList) {

        // 처리) 코트 id 생성
        for(int i = 0; i < courtList.size(); i++) {
            String facility_id = courtList.get(i).getFacility_id();
            String idx = "";
            if( (i+1)-10 < 0 ) idx = "0" + (i+1);
            else idx = "i+1";
            courtList.get(i).setCourt_id("C_" + facility_id.substring(12) + idx);
            // "c_" + 시설 id 마지막 4자리 + 01

            adminCourtMapper.register(courtList.get(i));
            log.info("코트 서비스! courtDTO = " + courtList.get(i));
        }
    }

    public List<CourtVO> getList() {
        return adminCourtMapper.getList();
    }

    public CourtVO read(String court_id) {
        return adminCourtMapper.read(court_id);
    }
}
