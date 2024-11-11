package com.green.smarty.service.product;

import com.green.smarty.mapper.product.SizeMapper;
import com.green.smarty.vo.product.SizeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SizeService {
    @Autowired
    private SizeMapper sizeMapper;

    public void addSizesToProduct(String productId, List<SizeVO> sizes) {
        sizes.forEach(size -> {
            size.setProduct_id(productId);
            sizeMapper.register(size);
        });
    }

    public int modifySize(SizeVO sizeVO) {
        return sizeMapper.modify(sizeVO);
    }

    public void removeSize(String sizeId) {
        sizeMapper.removeSize(sizeId);
    }

    public List<SizeVO> getSizesByProductId(String productId) {
        return sizeMapper.getSizesByProductId(productId);
    }
}
