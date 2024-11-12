package com.green.smarty.controller.product.admin;

import com.green.smarty.service.product.ProductAttachService;
import com.green.smarty.vo.product.ProductAttachVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/product-attaches")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminProductAttachController {
    @Autowired
    private ProductAttachService productAttachService;

    @PostMapping("/register")
    public ResponseEntity<String> registerProductAttach(@RequestBody ProductAttachVO attach) {
        productAttachService.registerProductAttach(attach);
        return ResponseEntity.ok("Product attachment registered successfully.");
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<ProductAttachVO>> getAttachByProductId(@PathVariable("productId") String productId) {
        List<ProductAttachVO> attaches = productAttachService.getAttachByProductId(productId);
        return ResponseEntity.ok(attaches);
    }
}
