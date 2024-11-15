package com.green.smarty.controller;

import com.green.smarty.service.AdminProductService;
import com.green.smarty.vo.ProductVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    AdminProductService adminProductService;

    @PostMapping("/")
    public String register(@ModelAttribute ProductVO productVO) throws IOException {
        System.out.println("컨트롤러 물품 등록! productVO = " + productVO);
        adminProductService.register(productVO);
        return "물품 등록 성공";
    }

    @GetMapping("/list")
    public List<ProductVO> getList() {
        System.out.println("컨트롤러 물품 전체 조회!");
        return adminProductService.getList();
    }

    @GetMapping("/{product_id}")
    public ProductVO read(@PathVariable (name = "product_id") String product_id) {
        System.out.println("컨트롤러 물품 하나 조회! : " + product_id);
        return adminProductService.read(product_id);
    }
}
