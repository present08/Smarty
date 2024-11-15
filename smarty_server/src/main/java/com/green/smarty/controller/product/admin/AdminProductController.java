package com.green.smarty.controller.product.admin;

import com.green.smarty.service.product.ProductService;
import com.green.smarty.vo.product.ProductAttachVO;
import com.green.smarty.vo.product.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminProductController {
    @Autowired
    private ProductService productService;

    // 새로운 대여물품 등록
    @PostMapping("/register")
    public ResponseEntity<List<ProductVO>> registerProduct(@RequestBody List<ProductVO> productList) {
        List<ProductVO> registeredProducts = productService.registerProduct(productList);
        return ResponseEntity.ok(registeredProducts);  // `product_id` 포함한 상품 목록 반환
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
    // 대여물품 조회
    @GetMapping
    public List<ProductVO> getAllProducts(){
        return productService.getAllProducts();
    }
    // 특정 대여물품 조회
    @GetMapping("/{productId}")
    public ResponseEntity<ProductVO> getProductById(@PathVariable("productId") String productId) {
        ProductVO product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
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
