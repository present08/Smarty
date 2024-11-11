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
public class QuantityService {
    @Autowired
    private QuantityMapper quantityMapper;
    // 새로운 재고 등록
    public int registerQuantity(QuantityVO quantityVO) {
        return quantityMapper.register(quantityVO);
    }
    // 특정 제품의 모든 재고 조회
    public List<QuantityVO> getQuantitiesByProductId(String productId) {
        return quantityMapper.getQuantitiesByProductId(productId);
    }
    // 재고량 추가/감소
    public int updateStock(String quantityId, int quantity, String operationType) {
        return quantityMapper.updateStock(quantityId, quantity, operationType);
    }
    // 전체 재고량 설정
    public int setStock(String quantityId, int stock) {
        return quantityMapper.setStock(quantityId, stock);
    }
    public List<QuantityVO> getTotalStockForAllProducts() {
        return quantityMapper.getTotalStockForAllProducts();
    }
    public List<QuantityVO> getDetailsByProductId(String productId) {
        return quantityMapper.getDetailsByProductId(productId);
    }
    public List<Map<String, Object>> getDetailsWithSizeByProductId(String productId) {
        return quantityMapper.getDetailsWithSizeByProductId(productId);
    }

}
