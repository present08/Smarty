package com.green.smarty.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {
    // 파일 데이터 입출력 담당

    @Value("upload")
    private String uploadPath;

    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);
        if(tempFolder.exists() == false) tempFolder.mkdir();
        uploadPath = tempFolder.getAbsolutePath();  // 절대 경로로 변환하고 로깅으로 경로 정보 출력
        log.info("업로드 파일 절대경로 = "+ uploadPath);
    }

    // 파일 업로드 작업
    public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException {

        if(files == null || files.size() == 0) {
            return List.of();
        }
        List<String> uploadNames = new ArrayList<>();
        for(MultipartFile multipartFile : files) {
            String savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
            Path savePath = Paths.get(uploadPath, savedName);
            // 저장할 파일 이름을 생성하고, Paths.get()으로 저장 경로 지정

            try{
                Files.copy(multipartFile.getInputStream(), savePath);
                // 이미지 파일이라면 썸네일 생성
                String contentType = multipartFile.getContentType();
                if(contentType != null && contentType.startsWith("image")) {
                    Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);
                    Thumbnails.of(savePath.toFile())
                            .size(200, 200)
                            .toFile(thumbnailPath.toFile());
                }
                uploadNames.add(savedName);
                // Files.copy() 메서드로 실제 파일 데이터를 해당 경로에 복사하고, 파일 이름을 리스트에 저장
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
        return uploadNames;
        //최종적으로 업로드된 파일 이름 리스트 반환
    }

    // 파일 데이터를 읽어서 스프링에서 제공하는 Resource 타입으로 반환, 특정 파일 조회시 사용
    public ResponseEntity<Resource> getFile (String fileName) {

        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
        if (!resource.isReadable()) {
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpg");
        }

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
            // 파일의 종류마다 다르게 HTTP 헤더 'Content-Type' 값을 생성해야 하므로\
            // Files.probeContentType()으로 헤더 메세지 생성
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    // 파일 이름을 기준으로 한 번에 여러 개의 파일을 삭제하는 기능
    public void deleteFiles(List<String> fileNames) {

        if(fileNames == null || fileNames.size() == 0) {
            return;
        }

        fileNames.forEach(fileName -> {
            String thumbnailFileName = "s_" + fileName;
            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath, fileName);
            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        });
    }

}
