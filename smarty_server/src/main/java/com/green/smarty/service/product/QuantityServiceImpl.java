package com.green.smarty.service.product;

import com.green.smarty.mapper.product.QuantityMapper;
import com.green.smarty.vo.product.QuantityVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class QuantityServiceImpl implements QuantityService{
    @Autowired
    private QuantityMapper quantityMapper;

    @Override
    // 새로운 재고 등록
    public int registerQuantity(QuantityVO quantityVO) {
        return quantityMapper.register(quantityVO);
    }
    @Override
    // 특정 상품의 모든 재고 조회
    public List<QuantityVO> getQuantitiesByProductId(String productId) {
        return quantityMapper.getQuantitiesByProductId(productId);
    }

    @Override
    // 재고량 증감 처리
    public int updateStock(String quantityId, int quantity, String operationType) {
        return quantityMapper.updateStock(quantityId, quantity, operationType);
    }

    @Override
    // 전체 재고량 직접 설정
    public int setStock(String quantityId, int stock) {
        return quantityMapper.setStock(quantityId, stock);
    }


    @Override
    public List<QuantityVO> getTotalStockForAllProducts() {
        return quantityMapper.getTotalStockForAllProducts();
    }

    @Override
    public List<QuantityVO> getDetailsByProductId(String productId) {
        return quantityMapper.getDetailsByProductId(productId);
    }

    @Override
    public List<Map<String, Object>> getDetailsWithSizeByProductId(String productId) {
        return quantityMapper.getDetailsWithSizeByProductId(productId);
    }
}
