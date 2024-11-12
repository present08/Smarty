package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductAttachMapper;
import com.green.smarty.vo.product.ProductAttachVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductAttachService {
    @Autowired
    private ProductAttachMapper productAttachMapper;

    public void registerProductAttach(ProductAttachVO attach) {
        productAttachMapper.insertProductAttach(attach);
    }

    public List<ProductAttachVO> getAttachByProductId(String productId) {
        return productAttachMapper.selectAttachByProductId(productId);
    }

}
