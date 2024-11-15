package com.green.smarty.service;

import com.green.smarty.mapper.AdminProductMapper;
import com.green.smarty.util.CustomFileUtil;
import com.green.smarty.vo.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AdminProductService {
    @Autowired
    private AdminProductMapper adminProductMapper;

    @Autowired
    private CustomFileUtil customFileUtil;

    // 물품 등록 시에 비즈니스 로직 처리
    public void register(ProductVO productVO) throws IOException {
        // 첨부파일 유무에 따른 처리
        if(productVO.getFiles().get(0).isEmpty()) {
            System.out.println("물품 서비스 처리1-1: 이미지 없음! 그대로 전송");
            adminProductMapper.register(productVO);

        } else {
            System.out.println("물품 서비스 처리1-2: 이미지 있음! 하나씩 저장");
            productVO.setProduct_images(true);
            List<MultipartFile> files =  productVO.getFiles();
            Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
            // 첨부파일에 대한 정보가 키와 값(리스트)로 맵에 저장됨 -> 파일이름 저장 후 매퍼 전송
            productVO.setFile_name(filesInfo.get("file_name"));
            adminProductMapper.register(productVO);

            // filesInfo 맵에서 하나씩 꺼내어 product_attach 파라미터로 전달
            for(int i = 0; i < files.size(); i++) {
                adminProductMapper.fileUpload(productVO.getProduct_id(),
                        filesInfo.get("origin_path").get(i),
                        filesInfo.get("thumbnail_path").get(i),
                        filesInfo.get("file_name").get(i));
            }
        }


    }

    public List<ProductVO> getList() {
        return adminProductMapper.getList();
    }

    public ProductVO read(String product_id) {
        return adminProductMapper.read(product_id);
    }
}
