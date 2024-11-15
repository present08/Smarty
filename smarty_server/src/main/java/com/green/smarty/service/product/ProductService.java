package com.green.smarty.service.product;

import com.green.smarty.dto.ProductAdminDTO;
import com.green.smarty.mapper.product.ProductMapper;
import com.green.smarty.util.CustomFileUtil;
import com.green.smarty.vo.product.ProductVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
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


    // 상품 등록
    public void registerProduct(ProductAdminDTO productAdminDTO) {
        // VO 변환 및 product_id 생성
        ProductVO productVO = toProductVO(productAdminDTO);
        String productId = generateProductId(productVO.getFacility_id());
        productVO.setProduct_id(productId);

        // 상품 등록
        productMapper.insertProduct(productVO);
    }

    // 파일 업로드 처리
    public void uploadFiles(String productId, List<MultipartFile> files) throws IOException {
        if (files == null || files.isEmpty()) {
            log.info("첨부파일 없음, 파일 처리 건너뜀.");
            return;
        }

        Map<String, List<String>> filesInfo = customFileUtil.saveFiles(files);
        List<String> originPaths = filesInfo.get("origin_path");
        List<String> thumbnailPaths = filesInfo.get("thumbnail_path");
        List<String> fileNames = filesInfo.get("file_name");

        for (int i = 0; i < fileNames.size(); i++) {
            productMapper.fileUpload(
                    productId,
                    originPaths.get(i),
                    thumbnailPaths.get(i),
                    fileNames.get(i)
            );
        }
    }

    private String generateProductId(String facilityId) {
        int index = 1;
        String baseId = facilityId.substring(facilityId.length() - 4);
        String productId;

        do {
            productId = "p" + baseId + String.format("%02d", index++);
        } while (productMapper.existsByProductId(productId));

        return productId;
    }

    private ProductVO toProductVO(ProductAdminDTO dto) {
        return ProductVO.builder()
                .facility_id(dto.getFacility_id())
                .product_name(dto.getProduct_name())
                .management_type(dto.getManagement_type().trim()) // 공백 제거
                .price(dto.getPrice())
                .size(dto.getSize() != null ? String.join(",", dto.getSize()) : null)
                .stock(dto.getStock())
                .product_images(dto.isProduct_images())
                .build();
    }

    public List<ProductAdminDTO> getAllProducts() {
        List<ProductVO> productVOs = productMapper.getAllProducts();
        List<ProductAdminDTO> productAdminDTOs = new ArrayList<>();

        for (ProductVO productVO : productVOs) {
            productAdminDTOs.add(toProductAdminDTO(productVO));
        }

        return productAdminDTOs;
    }

    public ProductAdminDTO getProductById(String productId) {
        ProductVO productVO = productMapper.getProductById(productId);
        return toProductAdminDTO(productVO);
    }

    private ProductAdminDTO toProductAdminDTO(ProductVO vo) {
        return ProductAdminDTO.builder()
                .product_id(vo.getProduct_id())
                .facility_id(vo.getFacility_id())
                .product_name(vo.getProduct_name())
                .management_type(vo.getManagement_type())
                .price(vo.getPrice())
                .size(vo.getSize() != null ? List.of(vo.getSize().split(",")) : new ArrayList<>())
                .stock(vo.getStock())
                .product_images(vo.isProduct_images())
                .build();
    }
}
