package com.green.smarty.controller;


import com.green.smarty.mapper.UserProductMapper;
import com.green.smarty.service.UserProductService;
import com.green.smarty.vo.ProductAttachVO;
import com.green.smarty.vo.ProductVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/user/products")

public class UserProductController {
    @Autowired
    private UserProductService service;
    @Autowired
    private UserProductMapper productMapper;
    @Value("upload")
    private String uploadPath;

    // product Data 전달
    @GetMapping("/")
    public List<ProductVO> getProduct() {
            List<ProductVO> productList = productMapper.getAllProducts();
//            log.info("Products from controller: {}", productList);
            return productList;
    }


    @GetMapping("/detail/{product_id}")
    public ResponseEntity<ProductVO> getProductById(@PathVariable String product_id) {
        try {
            ProductVO product = service.getProductById(product_id);
            if (product != null) {
//                log.info("Found product: {}", product);
                return ResponseEntity.ok(product);
            } else {
//                log.warn("Product not found with id: {}", product_id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("상품 조회 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
//            log.info("요청된 이미지 파일명: {}", filename);

            // UUID 중복 제거 처리
            String actualFileName = filename;
            if (filename.contains("_")) {
                actualFileName = filename.substring(0, filename.lastIndexOf("_")) +
                        filename.substring(filename.lastIndexOf("."));
            }

//            log.info("처리된 파일명: {}", actualFileName);
            Path filePath = Paths.get(uploadPath, actualFileName);
//            log.info("전체 파일 경로: {}", filePath);

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
//                log.warn("파일을 찾을 수 없음: {}", filePath);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
//            log.error("이미지 로딩 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{product_id}/images")
    public ResponseEntity<List<ProductAttachVO>> getProductImages(@PathVariable String product_id) {
        try {
            List<ProductAttachVO> attachList = service.getAttachList(product_id);
            return ResponseEntity.ok(attachList);
        } catch (Exception e) {
            log.error("이미지 조회 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
