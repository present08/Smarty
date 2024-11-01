package com.green.smarty.service.product;

import com.green.smarty.mapper.product.SizeMapper;
import com.green.smarty.vo.product.SizeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SizeServiceImpl implements SizeService{
    @Autowired
    private SizeMapper sizeMapper;
    @Override
    public void addSizesToProduct(String productId, List<SizeVO> sizes) {
        sizes.forEach(size -> {
            size.setProduct_id(productId);
            sizeMapper.register(size);
        });
    }

    @Override
    public int modifySize(SizeVO sizeVO) {
        return sizeMapper.modify(sizeVO);
    }

    @Override
    public void removeSize(String sizeId) {
        sizeMapper.removeSize(sizeId);
    }

    @Override
    public List<SizeVO> getSizesByProductId(String productId) {
        return sizeMapper.getSizesByProductId(productId);
    }
}
