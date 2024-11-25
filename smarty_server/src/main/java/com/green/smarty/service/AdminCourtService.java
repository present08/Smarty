package com.green.smarty.service;

import com.green.smarty.mapper.AdminCourtMapper;
import com.green.smarty.mapper.AdminFacilityMapper;
import com.green.smarty.vo.CourtVO;
import com.green.smarty.vo.FacilityVO;
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
    @Autowired
    private AdminFacilityMapper adminFacilityMapper;

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

    public void modify(String facility_id, List<CourtVO> courtList) {
        // 처리1) 비교할 기존의 코트 가져오기
        List<CourtVO> originCourtList = adminCourtMapper.getList(facility_id);

        // 처리2) 기본 코트(시설 등록시 따로 코트 등록 안 한 경우) 여부 확인
        FacilityVO facilityVO = adminFacilityMapper.read(facility_id);

        if(facilityVO.isCourt() && originCourtList.size() == 1) {
            // 처리2-1) 기본 코트 삭제
            adminFacilityMapper.remove(originCourtList.get(0).getCourt_id());
            // 처리2-2) 추가된 코트 등록
            for(int i = 0; i < courtList.size(); i++) {
                // 처리) 코트 id 생성하여 하나씩 매퍼로 전달
                //      : "C_" + 시설 id 마지막 4자리 + 01~
                String idx = "";
                if( (i+1)-10 < 0 ) idx = "0" + (i+1);
                else idx = "i+1";
                String court_id = "C_" + facility_id.substring(12) + idx;
                System.out.println("코트 등록 처리) 생성된 코드 id = " + court_id);
                courtList.get(i).setCourt_id(court_id);
                adminCourtMapper.register(courtList.get(i));

            }
        } else{
            // 기존 등록된 코트의 내용만 변경된 경우
            for(int i = 0; i < originCourtList.size(); i++) {
                originCourtList.get(i).changeName(courtList.get(i).getCourt_name());
                originCourtList.get(i).changeCourtStatus(courtList.get(i).isCourt_status());
                adminCourtMapper.modify(courtList.get(i));
            }
        }

    }

    public void remove(String court_id) {
        adminCourtMapper.remove(court_id);
    }

}
