package com.green.smarty.service;

import com.green.smarty.dto.ProductDTO;
import com.green.smarty.mapper.ProductMapper;
import com.green.smarty.util.CustomFileUtil;
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
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private CustomFileUtil customFileUtil;

    // 물품 등록 시에 비즈니스 로직 처리
    public int register(ProductDTO productDTO) throws IOException {

        // 첨부파일 유무에 따른 처리
        if(productDTO.getFiles().get(0).isEmpty()) {
            log.info("서비스 물품등록 처리 : 이미지 없음! 그대로 매퍼로 전송");
            productMapper.register(productDTO);

        } else {
            log.info("서비스 물품등록 처리 : 이미지 있음! customFileUtil 호출");
            productDTO.setProduct_images(true);
            List<MultipartFile> files =  productDTO.getFiles();
            Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
            // 첨부파일에 대한 정보가 키와 값(리스트)로 맵에 저장
            // 하나씩 꺼내어 product_attach의 파라미터로 전달
            // product_id 추출
            productMapper.register(productDTO);
            // int id = productMapper.register(productDTO);
            // 이렇게 작성하는 경우 insert문 실행 결과로 반환되는 변경된 행의 수인 1만 반환함
            // 등록된 후의 id값을 직접 가져와야 정확
            int id = productDTO.getProduct_id();
            productDTO.setFile_name(filesInfo.get("file_name"));
            for(int i = 0; i < files.size(); i++) {
                productMapper.fileUpload(id,
                        filesInfo.get("origin_path").get(i),
                        filesInfo.get("thumbnail_path").get(i),
                        filesInfo.get("file_name").get(i));
            }
        }
        int id = productDTO.getProduct_id();
        return id;
    }

    public List<ProductDTO> getList() {
        return productMapper.getList();
    }

    public ProductDTO read(int product_id) {
        return productMapper.read(product_id);
    }
}
