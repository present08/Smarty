/*
package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductAttachMapper;
import com.green.smarty.util.CustomFileUtil;
import com.green.smarty.vo.product.ProductAttachVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@Log4j2
public class ProductAttachService {
    @Autowired
    private ProductAttachMapper productAttachMapper;
    @Autowired
    private CustomFileUtil customFileUtil;

    public void registerProductAttachWithFiles(String productId, List<MultipartFile> files) throws IOException {
        if (files == null || files.isEmpty() || files.get(0).isEmpty()) {
            log.info("파일 첨부 없음, 첨부파일 등록을 건너뜁니다.");
            return;
        }

        Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
        List<String> originPaths = filesInfo.get("origin_path");
        List<String> thumbnailPaths = filesInfo.get("thumbnail_path");
        List<String> fileNames = filesInfo.get("file_name");

        for (int i = 0; i < files.size(); i++) {
            ProductAttachVO attach = new ProductAttachVO();
            attach.setProduct_id(productId);
            attach.setOrigin_path(originPaths.get(i));
            attach.setThumbnail_path(thumbnailPaths.get(i));
            attach.setFile_name(fileNames.get(i));

            productAttachMapper.insertProductAttach(attach);
            log.info("첨부 파일 등록 완료: product_id = " + productId + ", file_name = " + fileNames.get(i));
        }
    }

    public List<ProductAttachVO> getAttachByProductId(String productId) {
        return productAttachMapper.selectAttachByProductId(productId);
    }

}*/
