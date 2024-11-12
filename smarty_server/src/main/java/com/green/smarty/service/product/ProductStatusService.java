package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductStatusMapper;
import com.green.smarty.vo.product.ProductStatusVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ProductStatusService {
    @Autowired
    private ProductStatusMapper productStatusMapper;

    public void registerProductStatus(ProductStatusVO status) {
        productStatusMapper.insertProductStatus(status);
    }

    public void registerDefaultStatus(String productId) {
        ProductStatusVO status = new ProductStatusVO();
        status.setStatus_id(UUID.randomUUID().toString()); // 고유한 상태 ID 생성
        status.setProduct_id(productId);
        status.setStatus("대여 가능"); // 기본 상태값 설정
        productStatusMapper.insertProductStatus(status); // 상태 등록
    }

    public List<ProductStatusVO> getAllProductStatuses() {
        return productStatusMapper.getAllProductStatuses();
    }

    public void updateProductStatus(ProductStatusVO productStatus) {
        productStatusMapper.updateProductStatus(productStatus);
    }

    public List<ProductStatusVO> getStatusByProductId(String productId) {
        return productStatusMapper.selectStatusByProductId(productId);
    }
}
