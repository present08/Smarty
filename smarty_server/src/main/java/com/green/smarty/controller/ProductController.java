package com.green.smarty.controller;

import com.green.smarty.dto.ProductDTO;
import com.green.smarty.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/")
    public String register(ProductDTO productDTO) throws IOException {
        log.info("컨트롤러 물품 등록! productDTO = " + productDTO);
        int id = productService.register(productDTO);
        log.info("등록된 물품 id = " + id + ", productDTO = " + productDTO);
        return "등록된 물품 id = " + id + ", productDTO = " + productDTO;

    }

    @GetMapping("/list")
    public List<ProductDTO> getList() {
        log.info("컨트롤러 물품 전체 조회!");
        return productService.getList();
    }

    @GetMapping("/{product_id}")
    public ProductDTO read(@PathVariable (name = "product_id") int product_id) {
        return productService.read(product_id);
    }
}
