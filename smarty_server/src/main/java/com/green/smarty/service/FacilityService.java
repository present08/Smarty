package com.green.smarty.service;

import com.green.smarty.dto.FacilityDTO;
import com.green.smarty.mapper.FacilityMapper;
import com.green.smarty.util.CustomFileUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@Log4j2
public class FacilityService {

    @Autowired
    private CustomFileUtil customFileUtil;

    @Autowired
    private FacilityMapper facilityMapper;

    // 시설 등록 시의 비즈니스 로직 처리
    public String register(FacilityDTO facilityDTO) throws IOException {

        // 처리1. 시설 id 생성 후 부여
        String id = "fc_" + System.currentTimeMillis();
        facilityDTO.setFacility_id(id);
        log.info("서비스 시설등록 처리1: id 생성 = " + facilityDTO.getFacility_id());


        // 처리2. 첨부파일 유무에 따른 처리
        if(facilityDTO.getFiles().get(0).isEmpty()) {
            log.info("서비스 시설등록 처리2-1 : 이미지 없음! 그대로 매퍼 전송");
            facilityMapper.register(facilityDTO);
        } else {
            log.info("서비스 시설등록 처리2-2 : 이미지 있음! customFileUtil 호출");
            facilityDTO.setFacility_images(true);
            // 이미지 여부 true로 변경해주고,
            // facilityDTO의 첨부파일 리스트 기반으로 경로(원본, 썸네일), 파일명 리스트 생성
            List<MultipartFile> files = facilityDTO.getFiles();
            Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
            facilityDTO.setFile_name(filesInfo.get("file_name"));
            facilityMapper.register(facilityDTO);
            for(int i = 0; i < files.size(); i++) {
                // 파일 이름 저장

                // facility_attach 테이블 등록
                facilityMapper.fileUpload(facilityDTO.getFacility_id(),
                        filesInfo.get("origin_path").get(i),
                        filesInfo.get("thumbnail_path").get(i),
                        filesInfo.get("file_name").get(i));
            }
        }
        return id;
    }

    public List<FacilityDTO> getList() {
        log.info("서비스에서 매퍼로 전송중! 전체 조회!");
        return facilityMapper.getList();
    }

    public FacilityDTO read(String id) {
        log.info("서비스에서 매퍼로 전송중! 하나 조회! id = " + id);
        return facilityMapper.read(id);
    }

    public FacilityDTO modify(FacilityDTO facilityDTO) {
        String id = facilityDTO.getFacility_id();
        log.info("서비스 시설 수정! id = " + id);
        facilityMapper.modify(facilityDTO);

        return facilityMapper.read(id);
    }

    public void remove(String id) {
        log.info("서비스에서 매퍼로 전송중! 삭제!");
        facilityMapper.remove(id);
    }
}
