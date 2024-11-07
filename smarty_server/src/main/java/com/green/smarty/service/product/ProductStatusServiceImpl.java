package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductStatusMapper;
import com.green.smarty.vo.product.ProductStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductStatusServiceImpl implements ProductStatusService{
    @Autowired
    private ProductStatusMapper productStatusMapper;

    @Override
    public List<ProductStatusVO> getAllProductStatuses() {
        return productStatusMapper.getAllProductStatuses();
    }

    @Override
    public void updateProductStatus(ProductStatusVO productStatus) {
        productStatusMapper.updateProductStatus(productStatus);
    }

    @Override
    public List<ProductStatusVO> getProductStatusByQuantityId(String productId) {
        return productStatusMapper.getProductStatusByQuantityId(productId);
    }
}
