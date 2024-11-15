package com.green.smarty.service;

import com.green.smarty.mapper.AdminProductMapper;
import com.green.smarty.util.CustomFileUtil;
import com.green.smarty.vo.ProductVO;
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
public class AdminProductService {
    @Autowired
    private AdminProductMapper adminProductMapper;

    @Autowired
    private CustomFileUtil customFileUtil;

    // 물품 등록 시에 비즈니스 로직 처리
    public void register(ProductVO productVO) throws IOException {
        // 첨부파일 유무에 따른 처리
        if(productVO.getFiles().get(0).isEmpty()) {
            log.info("서비스 물품등록 처리2) : 이미지 없음! 그대로 매퍼로 전송");
            adminProductMapper.register(productVO);

        } else {
            log.info("서비스 물품등록 처리2) : 이미지 있음! customFileUtil 호출");
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

//    public void register(List<ProductDTO> productList) throws IOException {
//        for(int i = 0; i < productList.size(); i++) {
//
//            //         처리1. product_id 생성
//            String facility_id = productList.get(i).getFacility_id();
//            String idx = "";
//            if( (i+1)-10 < 0 ) idx = "0" + (i+1);
//            else idx = "i+1";
//            String product_id = "p_" + facility_id.substring(12) + idx;
//            productList.get(i).setProduct_id(product_id);
//            log.info("물품 서비스 처리 1) 생성된 product_id : " + product_id);
//
//            // 처리2. productDTO의 첨부파일 유무에 따른 처리
//            if(productDTO.getFiles().get(0).isEmpty()) {
//                log.info("서비스 물품등록 처리2) : 이미지 없음! 그대로 매퍼로 전송");
//                productMapper.register(productDTO);
//
//            } else {
//                log.info("서비스 물품등록 처리2) : 이미지 있음! customFileUtil 호출");
//                productDTO.setProduct_images(true);
//                List<MultipartFile> files =  productDTO.getFiles();
//                Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
//                // 첨부파일에 대한 정보가 키와 값(리스트)로 맵에 저장됨 -> 파일이름 저장 후 매퍼 전송
//                productDTO.setFile_name(filesInfo.get("file_name"));
//                productMapper.register(productDTO);
//
//                // filesInfo 맵에서 하나씩 꺼내어 product_attach 파라미터로 전달
//                for(int i = 0; i < files.size(); i++) {
//                    productMapper.fileUpload(productDTO.getProduct_id(),
//                            filesInfo.get("origin_path").get(i),
//                            filesInfo.get("thumbnail_path").get(i),
//                            filesInfo.get("file_name").get(i));
//                }
//            }
//        }
//    }

    public List<ProductVO> getList() {
        return adminProductMapper.getList();
    }

    public ProductVO read(int product_id) {
        return adminProductMapper.read(product_id);
    }
}
