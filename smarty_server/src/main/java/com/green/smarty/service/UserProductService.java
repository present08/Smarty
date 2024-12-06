package com.green.smarty.service;

import com.green.smarty.mapper.UserProductAttachMapper;
import com.green.smarty.mapper.UserProductMapper;
import com.green.smarty.util.CustomFileUtil;
import com.green.smarty.vo.ProductAttachVO;
import com.green.smarty.vo.ProductVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserProductService{
    @Autowired
    private UserProductMapper userProductMapper;
    @Autowired
    private CustomFileUtil customFileUtil;


//    @Transactional
//    public Long register(ProductVO vo, List<MultipartFile> files) {
//        log.info("상품 등록 전: {}", vo.getProduct_id());
//        mapper.register(vo);
//        log.info("상품 등록 후: {}", vo.getProduct_id());
//
//        if (files != null && !files.isEmpty()) {
//            try {
//                List<String> uploadedFileNames = fileUtil.saveFiles(files);
//
//                uploadedFileNames.forEach(fileName -> {
//                    ProductAttachDTO productAttachDTO = ProductAttachDTO.builder()
//                            .uuid(fileName.substring(0, fileName.lastIndexOf(".")))  // 확장자 제외한 UUID
//                            .uploadPath(fileUtil.getUploadPath())
//                            .fileName(fileName)
//                            .image(isImageFile(fileName))
//                            .product_id(vo.getProduct_id())
//                            .build();
//
//                    log.info("첨부 파일 정보: {}", attachFileDTO);
//                    attachFileMapper.insert(attachFileDTO);
//                });
//            } catch (IOException e) {
//                log.error("파일 업로드 실패: ", e);
//                throw new RuntimeException("파일 업로드 실패", e);
//            }
//        }
//        return vo.getProduct_id();
//    }


    public List<ProductVO> getAllProducts() {
        List<ProductVO> productList = userProductMapper.getAllProducts();
        log.info("Products from service: {}", productList);
        return productList;
    }

//    @Transactional
//    public void deleteProduct(String product_id) {
//        List<ProductAttachVO> attachFiles = attachFileMapper.findByProductId(product_id);
//        if (!attachFiles.isEmpty()) {
//            fileUtil.deleteFiles(attachFiles.stream()
//                    .map(attach -> ProductAttachVO.builder()
//                            .origin_path(attach.getOrigin_path())
//                            .thumbnail_path(attach.getThumbnail_path())
//                            .build())
//                    .collect(Collectors.toList()));
//        }
//        // 상품 삭제
//        productmapper.deleteProduct(product_id);
//    }

//    @Transactional
//    public void updateProduct(ProductVO vo, List<MultipartFile> files) {
//        mapper.updateProduct(vo);
//
//        // 기존 파일 삭제
//        if (files != null && !files.isEmpty()) {
//            List<AttachFileDTO> oldFiles = attachFileMapper.findByProductId(vo.getProduct_id());
//            if (!oldFiles.isEmpty()) {
//                fileUtil.deleteFile(oldFiles.stream()
//                        .map(AttachFileDTO::getFileName)
//                        .collect(Collectors.toList()));
//                attachFileMapper.deleteByProductId(vo.getProduct_id());
//            }
//
//            // 새 파일 업로드
//            try {
//                List<String> uploadedFileNames = fileUtil.saveFiles(files);
//                uploadedFileNames.forEach(fileName -> {
//                    AttachFileDTO attachFileDTO = AttachFileDTO.builder()
//                            .uuid(UUID.randomUUID().toString())
//                            .uploadPath(fileUtil.getUploadPath())
//                            .fileName(fileName)
//                            .image(isImageFile(fileName))
//                            .product_id(vo.getProduct_id())
//                            .build();
//                    attachFileMapper.insert(attachFileDTO);
//                });
//            } catch (IOException e) {
//                throw new RuntimeException("파일 업로드 실패", e);
//            }
//        }
//    }

    public ProductVO getProductById(String product_id) {
        log.info("Fetching Product With Id: {}", product_id);
        ProductVO vo = userProductMapper.getProductById(product_id);
        if (vo == null) {
            log.warn("Product Not Found With Id: {}", product_id);
        }
        return vo;
    }


    // 상품 이미지 파일 이름 조회
    public List<String> getProductImageNames(String product_id) {
        List<String> fileNames = userProductMapper.getProductImages(product_id);
        if (fileNames == null || fileNames.isEmpty()) {
            log.warn("상품 이미지가 없습니다. product_id: {}", product_id);
            return Collections.emptyList();
        }
        return fileNames;
    }

    public ResponseEntity<Resource> showProductImage(String file_name) {
        log.info("서비스 파일 조회 요청 - file_name: {}", file_name);

        // 파일 이름이 null 또는 빈 값일 경우 기본 이미지 반환
        if (file_name == null || file_name.trim().isEmpty()) {
            log.warn("파일 이름이 비어있습니다. 기본 이미지로 반환합니다.");
            file_name = "default.jpg";
        }

        try {
            // CustomFileUtil을 사용해 파일 반환
            return customFileUtil.getFile(file_name);
        } catch (Exception e) {
            log.error("파일 조회 중 오류 발생 - file_name: {}", file_name, e);
            throw new RuntimeException("파일 조회 중 오류 발생", e);
        }
    }
}
