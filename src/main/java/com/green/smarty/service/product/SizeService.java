package com.green.smarty.service.product;

import com.green.smarty.vo.product.SizeVO;

import java.util.List;

public interface SizeService {
    void addSizesToProduct(String productId, List<SizeVO> sizes);
    int modifySize(SizeVO sizeVO);
    void removeSize(String sizeId);
    List<SizeVO> getSizesByProductId(String productId);
}
