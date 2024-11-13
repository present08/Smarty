package com.green.smarty.service;

import com.green.smarty.dto.FacilityAdminDTO;
import com.green.smarty.mapper.AdminFacilityMapper;
import com.green.smarty.util.CustomFileUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@Log4j2
public class AdminFacilityService {

    @Autowired
    private CustomFileUtil customFileUtil;

    @Autowired
    private AdminFacilityMapper adminFacilityMapper;

    // 시설 등록 시의 비즈니스 로직 처리
    public String register(FacilityAdminDTO facilityAdminDTO) throws IOException {

        // 처리1. 시설 id 생성 후 부여
        String id = "fc_" + System.currentTimeMillis();
        facilityAdminDTO.setFacility_id(id);
        log.info("서비스 시설등록 처리1: id 생성 = " + facilityAdminDTO.getFacility_id());

        // 처리2. 첨부파일 유무에 따른 처리
        List<MultipartFile> files = facilityAdminDTO.getFiles();

        if(files == null || files.isEmpty() || files.get(0).isEmpty()) {
            log.info("서비스 시설등록 처리2-1 : 이미지 없음, 기본 이미지 등록!");
            Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
            adminFacilityMapper.register(facilityAdminDTO);
            // facility_attach 테이블 등록
            adminFacilityMapper.fileUpload(facilityAdminDTO.getFacility_id(),
                    filesInfo.get("origin_path").get(0),
                    filesInfo.get("thumbnail_path").get(0),
                    filesInfo.get("file_name").get(0));
        } else {
            log.info("서비스 시설등록 처리2-2 : 이미지 있음, 반복문으로 등록!");
            facilityAdminDTO.setFacility_images(true);
            // 이미지 여부 true로 변경해주고,
            // facilityDTO의 첨부파일 리스트 기반으로 경로(원본, 썸네일), 파일명 리스트 생성
            Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
            facilityAdminDTO.setFile_name(filesInfo.get("file_name"));
            adminFacilityMapper.register(facilityAdminDTO);
            for(int i = 0; i < files.size(); i++) {
                // 파일 이름 저장

                // facility_attach 테이블 등록
                adminFacilityMapper.fileUpload(facilityAdminDTO.getFacility_id(),
                        filesInfo.get("origin_path").get(i),
                        filesInfo.get("thumbnail_path").get(i),
                        filesInfo.get("file_name").get(i));
            }
        }
        log.info("서비스 처리 완료! facilityDTO = " + facilityAdminDTO);
        return id;
    }

    public List<FacilityAdminDTO> getList() {
        return adminFacilityMapper.getList();
    }

    public FacilityAdminDTO read(String id) {
        log.info("서비스에서 매퍼로 전송중! 하나 조회! id = " + id);
        return adminFacilityMapper.read(id);
    }

    public FacilityAdminDTO modify(FacilityAdminDTO facilityAdminDTO) {
        String id = facilityAdminDTO.getFacility_id();
        log.info("서비스 시설 수정! id = " + id);
        adminFacilityMapper.modify(facilityAdminDTO);

        return adminFacilityMapper.read(id);
    }

    public void remove(String id) {
        log.info("서비스에서 매퍼로 전송중! 삭제!");
        adminFacilityMapper.remove(id);
    }
}
