package com.green.smarty.controller.product.admin;

import com.green.smarty.service.product.SizeService;
import com.green.smarty.vo.product.SizeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/product-sizes")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminSizeController {
    @Autowired
    private SizeService sizeService;

    @PostMapping("/{productId}")
    public void addSizesToProduct(@PathVariable("productId") String productId, @RequestBody List<SizeVO> sizes) {
        sizes.forEach(size -> {
            size.setProduct_id(productId);
            sizeService.addSizesToProduct(productId, sizes);
        });
    }}
