package com.green.smarty.controller;

import com.green.smarty.dto.ProductAdminDTO;
import com.green.smarty.service.AdminProductService;
import com.green.smarty.service.AdminProductStatusService;
import com.green.smarty.vo.ProductVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j2
public class AdminProductController {

    @Autowired
    AdminProductService adminProductService;

    @Autowired
    AdminProductStatusService adminProductStatusService;

    // 상품 등록 (JSON 데이터 처리)
    @PostMapping("/data")
    public ResponseEntity<List<String>> registerProductData(@RequestBody List<ProductAdminDTO> productList) {
        log.info("수신된 상품 리스트: {}", productList);

        List<String> allProductIds = new ArrayList<>();

        for (ProductAdminDTO product : productList) {
            // 상품 등록 후 모든 ProductVO 리스트 반환
            List<ProductVO> registeredProducts = adminProductService.registerProduct(product);

            // 상태 등록 호출 (각 ProductVO에 대해 처리)
            for (ProductVO productVO : registeredProducts) {
                adminProductStatusService.registerDefaultStatus(
                        productVO.getProduct_id(),
                        productVO.getManagement_type(),
                        productVO.getStock(),
                        productVO.getSize()
                );
                allProductIds.add(productVO.getProduct_id());
            }
        }

        return ResponseEntity.ok(allProductIds);
    }

    // 파일 업로드 처리
    @PostMapping("/files/{productId}")
    public ResponseEntity<String> uploadFiles(
            @PathVariable String productId,
            @RequestParam("files") List<MultipartFile> files
    ) {
        log.info("파일 업로드 시작! 상품 ID: {}", productId);

        // 첨부파일 확인
        if (files == null || files.isEmpty()) {
            log.warn("첨부파일이 없습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("첨부파일이 없습니다.");
        }
        log.info("수신된 파일 개수: {}", files.size());
        files.forEach(file -> log.info("파일 이름: {}", file.getOriginalFilename()));

        try {
            adminProductService.uploadFiles(productId, files);
            return ResponseEntity.ok("파일 업로드 성공!");
        } catch (IOException e) {
            log.error("파일 업로드 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("파일 업로드 실패");
        }
    }

    // 특정 상품 조회
    @GetMapping("/{product_id}")
    public ProductAdminDTO read(@PathVariable String product_id) {
        log.info("컨트롤러 특정 상품 조회! product_id = {}", product_id);
        return adminProductService.getProductById(product_id);
    }
}
