package com.green.smarty.controller.product;

import com.green.smarty.mapper.product.ProductMapper;
import com.green.smarty.service.product.ProductService;
import com.green.smarty.vo.product.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;
    // 새로운 대여물품 등록
    @PostMapping
    public void addProduct(@RequestBody ProductVO product) {
        productService.addProduct(product);
    }
    // 대여물품 정보 수정
    @PutMapping
    public void updateProduct(@RequestBody ProductVO product) {
        productService.updateProduct(product);
    }
    // 대여물품 삭제
    @DeleteMapping("/{productId}")
    public void deleteProduct(@PathVariable("productId") String productId) {
        productService.deleteProduct(productId);
    }
    @GetMapping
    public List<ProductVO> getAllProducts(){
        return productService.getAllProducts();
    }
    // 특정 상품 조회
    @GetMapping("/{productId}")
    public ProductVO getProductById(@PathVariable("productId") String productId) {
        return productService.getProductById(productId);
    }
    // 특정 시설의 모든 대여물품 조회
    @GetMapping("/facility/{facilityId}")
    public List<ProductVO> getProductsByFacilityId(@PathVariable("facilityId") String facilityId) {
        return productService.getProductsByFacilityId(facilityId);
    }


}
