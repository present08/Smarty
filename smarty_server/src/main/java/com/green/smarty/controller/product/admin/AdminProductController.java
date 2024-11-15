package com.green.smarty.controller.product.admin;

import com.green.smarty.dto.ProductAdminDTO;
import com.green.smarty.service.product.ProductService;

import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j2
public class AdminProductController {

    @Autowired
    private ProductService productService;

    // 상품 등록 (JSON 데이터 처리)
    @PostMapping("/data")
    public ResponseEntity<String> registerProductData(@RequestBody ProductAdminDTO productAdminDTO) {
        log.info("JSON 데이터 등록 시작!");
        productService.registerProduct(productAdminDTO);
        return ResponseEntity.ok("상품 데이터 등록 성공!");
    }

    // 파일 업로드 처리
    @PostMapping("/files/{productId}")
    public ResponseEntity<String> uploadFiles(
            @PathVariable String productId,
            @RequestParam("files") List<MultipartFile> files
    ) {
        log.info("파일 업로드 시작!");
        try {
            productService.uploadFiles(productId, files);
            return ResponseEntity.ok("파일 업로드 성공!");
        } catch (IOException e) {
            log.error("파일 업로드 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("파일 업로드 실패");
        }
    }


    // 전체 상품 조회
    @GetMapping("/list")
    public List<ProductAdminDTO> getList() {
        log.info("컨트롤러 물품 전체 조회!");
        return productService.getAllProducts();
    }

    // 특정 상품 조회
    @GetMapping("/{product_id}")
    public ProductAdminDTO read(@PathVariable String product_id) {
        log.info("컨트롤러 특정 상품 조회! product_id = {}", product_id);
        return productService.getProductById(product_id);
    }
}
