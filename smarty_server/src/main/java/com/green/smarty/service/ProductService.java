package com.green.smarty.service;

import com.green.smarty.vo.AttachFileDTO;
import com.green.smarty.vo.ProductVO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    Long register(ProductVO vo, List<MultipartFile> files);
    List<ProductVO> getAllProducts();
    void deleteProduct(Long product_id);
    void updateProduct(ProductVO vo, List<MultipartFile> files);

    ProductVO getProductById(Long product_id);
    List<AttachFileDTO> getAttachList(Long product_id);
}
