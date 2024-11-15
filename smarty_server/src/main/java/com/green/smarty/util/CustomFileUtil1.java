package com.green.smarty.util;
import com.green.smarty.vo.ProductAttachVO;
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
public class CustomFileUtil1 {

   @Value("upload")
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

   public List<ProductAttachVO> saveFiles(List<MultipartFile> files, String productId) throws IOException {
       if (files == null || files.isEmpty()) return List.of();

       List<ProductAttachVO> attachList = new ArrayList<>();

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

               // 원본 파일 경로
               String originPath = uploadPath + File.separator + savedName;
               Path savePath = Paths.get(originPath);

               // 원본 파일 저장
               Files.copy(file.getInputStream(), savePath);
               log.info("원본 파일 저장 완료: {}", savePath);

               // 썸네일 경로
               String thumbnailPath = uploadPath + File.separator + "s_" + savedName;

               // 이미지 파일 체크 및 썸네일 생성
               if (file.getContentType() != null && file.getContentType().startsWith("image")) {
                   try {
                       Path thumbnailPathObj = Paths.get(thumbnailPath);
                       log.info("썸네일 생성 시도: {}", thumbnailPathObj);

                       Thumbnails.of(savePath.toFile())
                               .size(200, 200)
                               .outputQuality(0.9)
                               .toFile(thumbnailPathObj.toFile());

                       log.info("썸네일 생성 완료");
                   } catch (Exception e) {
                       log.error("썸네일 생성 실패: {}", e.getMessage());
                       thumbnailPath = originPath; // 썸네일 생성 실패시 원본 경로 사용
                   }
               }

               // ProductAttachDTO 생성 및 추가
               ProductAttachVO attachDTO = ProductAttachVO.builder()
                       .product_id(productId)
                       .origin_path(originPath)
                       .thumbnail_path(thumbnailPath)
                       .file_name(originalFileName)
                       .build();

               attachList.add(attachDTO);

           } catch (IOException e) {
               log.error("파일 처리 중 오류 발생: {}", e.getMessage());
               throw new IOException("파일 저장 실패", e);
           }
       }
       return attachList;
   }

   private boolean isImageExtension(String extension) {
       return Arrays.asList(".jpg", ".jpeg", ".png", ".gif").contains(extension.toLowerCase());
   }

   public ResponseEntity<Resource> getFile(String filePath) {
       Resource resource = new FileSystemResource(filePath);

       if (!resource.isReadable()) {
           resource = new FileSystemResource(uploadPath + File.separator + "default.jpeg");
       }

       HttpHeaders headers = new HttpHeaders();
       try {
           headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
       } catch (Exception e) {
           return ResponseEntity.internalServerError().build();
       }

       return ResponseEntity.ok().headers(headers).body(resource);
   }

   public void deleteFiles(List<ProductAttachVO> attachList) {
       if (attachList == null || attachList.isEmpty()) return;

       attachList.forEach(attach -> {
           try {
               // 원본 파일 삭제
               Files.deleteIfExists(Paths.get(attach.getOrigin_path()));

               // 썸네일 파일 삭제 (원본과 다른 경우에만)
               if (!attach.getOrigin_path().equals(attach.getThumbnail_path())) {
                   Files.deleteIfExists(Paths.get(attach.getThumbnail_path()));
               }
           } catch (IOException e) {
               log.error("파일 삭제 실패: {}", e.getMessage());
               throw new RuntimeException("파일 삭제 실패", e);
           }
       });
   }
}
