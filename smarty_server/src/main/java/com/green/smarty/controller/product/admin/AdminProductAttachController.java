package com.green.smarty.controller.product.admin;

import com.green.smarty.service.product.ProductAttachService;
import com.green.smarty.vo.product.ProductAttachVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/product-attaches")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j2
public class AdminProductAttachController {
    @Autowired
    private ProductAttachService productAttachService;

    // 첨부파일 등록
    @PostMapping("/register/{productId}")
    public ResponseEntity<String> registerProductAttach(@PathVariable("productId") String productId, @RequestParam("files") List<MultipartFile> files) throws IOException {
        if (files == null || files.isEmpty()) {
            log.warn("파일이 전달되지 않았습니다. 파일 첨부를 건너뜁니다.");
            return ResponseEntity.badRequest().body("No files were attached.");
        }
        productAttachService.registerProductAttachWithFiles(productId, files);
        return ResponseEntity.ok("Product attachments registered successfully.");
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<ProductAttachVO>> getAttachByProductId(@PathVariable("productId") String productId) {
        List<ProductAttachVO> attaches = productAttachService.getAttachByProductId(productId);
        return ResponseEntity.ok(attaches);
    }
}
