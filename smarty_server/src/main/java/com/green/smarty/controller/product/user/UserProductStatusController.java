package com.green.smarty.controller.product.user;

import com.green.smarty.service.product.ProductStatusService;
import com.green.smarty.vo.product.ProductStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user/product-status")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProductStatusController {
    @Autowired
    private ProductStatusService productStatusService;

    @GetMapping("/all")
    public List<ProductStatusVO> getAllProductStatuses() {
        return productStatusService.getAllProductStatuses();
    }
}
