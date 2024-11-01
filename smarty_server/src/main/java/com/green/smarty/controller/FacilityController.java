package com.green.smarty.controller;

import com.green.smarty.dto.FacilityDTO;
import com.green.smarty.service.FacilityService;
import com.green.smarty.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/facility")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    @Autowired
    private CustomFileUtil customFileUtil;

    // Create (시설 등록)
    @PostMapping("/")
    public String register(@ModelAttribute FacilityDTO facilityDTO) throws IOException {

        log.info("컨트롤러 시설 등록! facilityDTO = " + facilityDTO);

        List<MultipartFile> files = facilityDTO.getFiles();
        List<String> file_name = customFileUtil.saveFiles(files);
        // facilityDTO의 첨부파일 기반으로 파일, 파일명 리스트 생성
        // 첨부파일이 없는 경우 기본값인 빈배열이 저장됨
        facilityDTO.setFile_name(file_name);

        log.info("컨트롤러 업로드 파일명! fileNames = " + file_name);
        facilityService.register(facilityDTO);
        return "등록 성공";
    }

    @GetMapping("/view/{file_name}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String file_name) {
        return customFileUtil.getFile(file_name);
    }

    // Read (시설 조회)
    @GetMapping("/list")
    public List<FacilityDTO> list() {
        log.info("컨트롤러 시설 전체 조회!");
        List<FacilityDTO> list = facilityService.list();
        return list;
    }
//
//    @GetMapping("/{id}")
//    public FacilityDTO get(@PathVariable(name = "id") String id) {
//        log.info("컨트롤러 시설 하나 조회! id = " + id);
//        return facilityService.get(id);
//    }
//
//    // Update (시설 수정)
//    @PutMapping("/{id}")
//    public FacilityDTO modify(
//            @PathVariable(name = "id") String id,
//            @RequestBody FacilityDTO facilityDTO) {
//
//        FacilityDTO updateDTO = facilityService.modify(facilityDTO);
//        log.info("컨트롤러 수정 완료! updateDTO = " + updateDTO);
//        return updateDTO;
//    }
//
//    // Delete (시설 삭제)
//    @DeleteMapping("/{id}")
//    public void remove(@PathVariable(name = "id") String id) {
//        log.info("컨트롤러 삭제! id = " + id);
//        facilityService.remove(id);
//    }
}
