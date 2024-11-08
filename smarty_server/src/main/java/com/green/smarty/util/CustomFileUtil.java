package com.green.smarty.util;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
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
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
@Log4j2
@RequiredArgsConstructor
@Getter
public class CustomFileUtil {

    @Value("${file.upload-dir}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        try {
            File tempFolder = new File(uploadPath);
            if (!tempFolder.exists()) {
                boolean created = tempFolder.mkdirs();  // mkdirs()로 변경 - 상위 디렉토리도 생성
                log.info("폴더 생성 결과: {}", created);
            }
            log.info("============================");
            log.info("Upload Path: {}", tempFolder.getAbsolutePath());
            log.info("폴더 존재 여부: {}", tempFolder.exists());
            log.info("폴더 권한: 읽기={}, 쓰기={}", tempFolder.canRead(), tempFolder.canWrite());
        } catch (Exception e) {
            log.error("폴더 초기화 실패", e);
        }
    }

    public List<String> saveFiles(List<MultipartFile> files) throws IOException {
        if (files == null || files.isEmpty()) return List.of();

        List<String> uploadNames = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                String originalFileName = file.getOriginalFilename();
                if (originalFileName == null) continue;

                // 파일 확장자 체크
                String extension = originalFileName.substring(originalFileName.lastIndexOf(".")).toLowerCase();
                if (!isImageExtension(extension)) {
                    log.warn("지원하지 않는 이미지 형식: {}", extension);
                    continue;
                }

                String savedName = UUID.randomUUID().toString() + extension;
                log.info("저장될 파일명: {}", savedName);

                Path savePath = Paths.get(uploadPath, savedName);

                // 원본 파일 저장
                Files.copy(file.getInputStream(), savePath);
                log.info("원본 파일 저장 완료: {}", savePath);

                // 이미지 파일 체크 및 썸네일 생성
                if (file.getContentType() != null && file.getContentType().startsWith("image")) {
                    try {
                        Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);
                        log.info("썸네일 생성 시도: {}", thumbnailPath);

                        // 썸네일 생성 시 버퍼 크기 지정
                        Thumbnails.of(savePath.toFile())
                                .size(200, 200)
                                .outputQuality(0.9)  // 품질 설정
                                .toFile(thumbnailPath.toFile());

                        log.info("썸네일 생성 완료");
                    } catch (Exception e) {
                        log.error("썸네일 생성 실패: {}", e.getMessage());
                        // 썸네일 생성 실패해도 원본 파일은 유지
                    }
                }

                uploadNames.add(savedName);

            } catch (IOException e) {
                log.error("파일 처리 중 오류 발생: {}", e.getMessage());
                throw new IOException("파일 저장 실패", e);
            }
        }
        return uploadNames;
    }

    // 지원하는 이미지 확장자 체크
    private boolean isImageExtension(String extension) {
        return Arrays.asList(".jpg", ".jpeg", ".png", ".gif").contains(extension.toLowerCase());
    }

    // Retrieve a file for download or display
    public ResponseEntity<Resource> getFile(String fileName) {
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);

        // If the file is not readable, return a default image
        if (!resource.isReadable()) {
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpeg");
        }

        HttpHeaders headers = new HttpHeaders();
        try {
            // Set the content type based on the file's MIME type
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        // Return the file with appropriate headers
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    // Delete files and their corresponding thumbnails if they exist
    public void deleteFile(List<String> fileNames) {
        if (fileNames == null || fileNames.isEmpty()) return;

        fileNames.forEach(fileName -> {
            // Check and delete thumbnail file if it exists
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
