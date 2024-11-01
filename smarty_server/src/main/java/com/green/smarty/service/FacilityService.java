package com.green.smarty.service;

import com.green.smarty.dto.FacilityDTO;
import com.green.smarty.mapper.FacilityMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@Log4j2
public class FacilityService {

    @Autowired
    private FacilityMapper facilityMapper;

    public void register(FacilityDTO facilityDTO) throws IOException {

        // 처리1. 시설 id 생성 후 부여
        String id = "fc_" + System.currentTimeMillis();
        facilityDTO.setFacility_id(id);
        log.info("서비스 등록 처리1: id 생성 = " + facilityDTO.getFacility_id());

        // 처리2. 첨부파일 유무에 따른 처리
        if(facilityDTO.getFiles().get(0).isEmpty()) {
            log.info("서비스 등록 처리2-1 : 이미지 없음! 그대로 매퍼 전송");
            facilityMapper.register(facilityDTO);
        } else {
            log.info("서비스 등록 처리2-2 : 이미지 있음! 후처리 진행");
            facilityDTO.setFacility_images(true);
            facilityMapper.register(facilityDTO);

            for(String file_name : facilityDTO.getFile_name()) {
                facilityMapper.fileUpload(facilityDTO.getFacility_id(), file_name);
            }
        }
    }

    public List<FacilityDTO> list() {
        log.info("서비스에서 매퍼로 전송중! 전체 조회!");
        return facilityMapper.list();
    }
//
//    public FacilityDTO get(String id) {
//        log.info("서비스에서 매퍼로 전송중! 하나 조회! id = " + id);
//        return facilityMapper.get(id);
//    }
//    public FacilityDTO modify(FacilityDTO facilityDTO) {
//        String updateId = facilityDTO.getFacility_id();
//        log.info("서비스! updateId = " + updateId);
//        facilityMapper.modify(facilityDTO);
//
//        return facilityMapper.get(updateId);
//    }
//
//    public void remove(String id) {
//        log.info("서비스에서 매퍼로 전송중! 삭제!");
//        facilityMapper.remove(id);
//    }
}
