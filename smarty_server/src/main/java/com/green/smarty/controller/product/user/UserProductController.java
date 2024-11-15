/*
package com.green.smarty.controller.product.user;

import com.green.smarty.service.product.ProductService;
import com.green.smarty.vo.product.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/products")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProductController {
    @Autowired
    private ProductService productService;

    // 대여물품 조회
    @GetMapping
    public List<ProductVO> getAllProducts(){
        return productService.getAllProducts();
    }
    // 특정 대여물품 조회
    @GetMapping("/{productId}")
    public ProductVO getProductById(@PathVariable("productId") String productId) {
        return productService.getProductById(productId);
    }
    //
    @GetMapping("/facility/{facilityId}")
    public List<ProductVO> getProductsByFacilityId(@PathVariable("facilityId") String facilityId) {
        if ("all".equals(facilityId)) {
            return productService.getAllProducts(); // 전체 제품 반환
        } else {
            return productService.getProductsByFacilityId(facilityId); // 특정 시설의 제품만 반환
        }
    }
}
*/
