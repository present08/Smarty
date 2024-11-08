package com.green.smarty.controller;

import com.green.smarty.service.ProductService;
import com.green.smarty.vo.AttachFileDTO;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")

public class ProductController {
    @Autowired
    private ProductService service;
    @Value("${file.upload-dir}")
    private String uploadPath;

    @GetMapping("/products")
    public ResponseEntity<List<ProductVO>> getProduct() {
        try {
            List<ProductVO> list = service.getAllProducts();
            log.info("Products from controller: {}", list);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            log.error("Error in getProduct: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/products")
    public ResponseEntity<String> postProduct(
            @RequestPart("product") ProductVO vo,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        try {
            log.info("상품 등록 요청: {}", vo);
            log.info("첨부 파일: {}", files != null ? files.size() : 0);

            Long productId = service.register(vo, files);
            return ResponseEntity.ok(productId + "번 등록 되었습니다");
        } catch (Exception e) {
            log.error("상품 등록 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 등록에 실패했습니다: " + e.getMessage());
        }
    }

    @DeleteMapping("/products/{product_id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long product_id) {
        try {
            service.deleteProduct(product_id);
            return ResponseEntity.ok("상품이 삭제되었습니다.");
        } catch (Exception e) {
            log.error("상품 삭제 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 삭제에 실패했습니다: " + e.getMessage());
        }
    }

    @PutMapping("/products/{product_id}")
    public ResponseEntity<String> updateProduct(
            @PathVariable Long product_id,
            @RequestPart("product") ProductVO vo,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        try {
            vo.setProduct_id(product_id);
            service.updateProduct(vo, files);
            return ResponseEntity.ok("상품이 수정되었습니다.");
        } catch (Exception e) {
            log.error("상품 수정 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 수정에 실패했습니다: " + e.getMessage());
        }
    }

    @GetMapping("/products/{product_id}")
    public ResponseEntity<ProductVO> getProductById(@PathVariable Long product_id) {
        try {
            ProductVO product = service.getProductById(product_id);
            if (product != null) {
                log.info("Found product: {}", product);
                return ResponseEntity.ok(product);
            } else {
                log.warn("Product not found with id: {}", product_id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("상품 조회 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/products/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            log.info("요청된 이미지 파일명: {}", filename);

            // UUID 중복 제거 처리
            String actualFileName = filename;
            if (filename.contains("_")) {
                actualFileName = filename.substring(0, filename.lastIndexOf("_")) +
                        filename.substring(filename.lastIndexOf("."));
            }

            log.info("처리된 파일명: {}", actualFileName);
            Path filePath = Paths.get(uploadPath, actualFileName);
            log.info("전체 파일 경로: {}", filePath);

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                log.warn("파일을 찾을 수 없음: {}", filePath);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("이미지 로딩 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/products/{product_id}/images")
    public ResponseEntity<List<AttachFileDTO>> getProductImages(@PathVariable Long product_id) {
        try {
            List<AttachFileDTO> attachList = service.getAttachList(product_id);
            return ResponseEntity.ok(attachList);
        } catch (Exception e) {
            log.error("이미지 조회 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
