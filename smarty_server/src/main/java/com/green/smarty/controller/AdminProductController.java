package com.green.smarty.controller;

import com.green.smarty.dto.ProductAdminDTO;
import com.green.smarty.service.AdminProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    AdminProductService adminProductService;

    @PostMapping("/")
    public String register(@ModelAttribute ProductAdminDTO productAdminDTO) throws IOException {
        log.info("컨트롤러 물품 등록! productDTO = " + productAdminDTO);
        adminProductService.register(productAdminDTO);
        return "물품 등록 성공";
    }

    @GetMapping("/list")
    public List<ProductAdminDTO> getList() {
        log.info("컨트롤러 물품 전체 조회!");
        return adminProductService.getList();
    }

    @GetMapping("/{product_id}")
    public ProductAdminDTO read(@PathVariable (name = "product_id") int product_id) {
        return adminProductService.read(product_id);
    }
}