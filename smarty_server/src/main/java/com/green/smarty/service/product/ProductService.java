package com.green.smarty.service.product;

import com.green.smarty.mapper.product.ProductMapper;
import com.green.smarty.vo.product.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductMapper productMapper;
/*
    public void registerProduct(List<ProductVO> productList) {
        for (int i = 0; i < productList.size(); i++) {
            ProductVO product = productList.get(i);
            String facilityId = product.getFacility_id();
            String baseId = "p_" + facilityId.substring(facilityId.length() - 4);
            String productId;

            String idx = (i + 1 < 10) ? "0" + (i + 1) : String.valueOf(i + 1);

            switch (product.getManagement_type()) {
                case "개별 관리":
                    // 개별 관리가 필요한 상품
                    for (int j = 1; j <= product.getStock(); j++) {
                        String stockIdx = (j < 10 ? "0" + j : String.valueOf(j));
                        productId = baseId + "_" + idx + "_" + stockIdx;
                        product.setProduct_id(productId);
                        productMapper.insertProduct(product);  // 각 항목을 개별적으로 DB에 삽입
                        System.out.println("Registered product with product_id = " + product.getProduct_id());
                    }
                    break;

                case "일괄 관리":
                    // 사이즈가 없는 상품 (여러 항목에 대한 구분을 위해 인덱스 포함)
                    productId = baseId + "_" + idx;
                    product.setProduct_id(productId);
                    productMapper.insertProduct(product);  // 여러 데이터가 각각의 ID로 삽입
                    System.out.println("Registered product with product_id = " + product.getProduct_id());
                    break;

                case "사이즈별 관리":
                    // 각 사이즈마다 개별적으로 product_id를 생성하여 삽입
                    if (product.getSize() != null && !product.getSize().isEmpty()) {
                        String[] sizes = product.getSize().split(",");
                        for (String size : sizes) {
                            size = size.trim().toUpperCase(); // 사이즈 값을 정리
                            productId = baseId + "_" + size + "_" + idx;
                            product.setProduct_id(productId);
                            product.setSize(size); // 개별 사이즈 설정
                            productMapper.insertProduct(product); // 사이즈별 데이터 삽입

                            System.out.println("Registered product with product_id = " + product.getProduct_id());
                        }
                    }
                    break;

                default:
                    throw new IllegalArgumentException("Invalid management type: " + product.getManagement_type());
            }
        }
    }*/
    // 상품명과 시설 ID로 중복 여부를 확인하는 메서드
    private boolean isDuplicateProductName(ProductVO product) {
        return productMapper.existsByProductName(product.getProduct_name());
    }

    // product_id 중복 여부를 확인하는 메서드
    private boolean isDuplicateProductId(String productId) {
        return productMapper.existsByProductId(productId);
    }

    public void registerProduct(List<ProductVO> productList) {
        for (int i = 0; i < productList.size(); i++) {
            ProductVO product = productList.get(i);
            String facilityId = product.getFacility_id();
            String baseId = "p_" + facilityId.substring(facilityId.length() - 4);
            String productId;
            String idx = (i + 1 < 10) ? "0" + (i + 1) : String.valueOf(i + 1);

            try {
                switch (product.getManagement_type()) {
                    case "개별 관리":
                        // 개별 관리: 중간 자리 비교 후, 동일 상품명인 경우 끝자리 비교
                        String individualBaseId = baseId + "_" + idx;
                        int middleIndex = productMapper.findMaxMiddleIndex(individualBaseId) + 1;

                        if (isDuplicateProductName(product)) { // 상품명과 시설 ID로 중복 확인
                            int suffixIndex = productMapper.findMaxSuffix(individualBaseId) + 1;
                            productId = individualBaseId + "_" + String.format("%02d", suffixIndex);
                        } else {
                            productId = individualBaseId + "_" + String.format("%02d", middleIndex);
                        }

                        // 최종 중복 확인 루프: product_id가 중복되지 않을 때까지 반복
                        while (isDuplicateProductId(productId)) {
                            int suffixIndex = productMapper.findMaxSuffix(individualBaseId) + 1;
                            productId = individualBaseId + "_" + String.format("%02d", suffixIndex);
                        }

                        product.setProduct_id(productId);
                        productMapper.insertProduct(product);
                        break;

                    case "일괄 관리":
                        // 일괄 관리: 끝자리만 비교하여 고유 product_id 생성
                        String batchBaseId = baseId + "_" + idx;
                        int batchSuffix = productMapper.findMaxSuffix(batchBaseId) + 1;
                        productId = batchBaseId + "_" + String.format("%02d", batchSuffix);

                        // 최종 중복 확인 루프
                        while (isDuplicateProductId(productId)) {
                            batchSuffix = productMapper.findMaxSuffix(batchBaseId) + 1;
                            productId = batchBaseId + "_" + String.format("%02d", batchSuffix);
                        }

                        product.setProduct_id(productId);
                        productMapper.insertProduct(product);
                        break;

                    case "사이즈별 관리":
                        // 사이즈별 관리: 끝자리만 비교하여 고유 product_id 생성
                        if (product.getSize() != null && !product.getSize().isEmpty()) {
                            String[] sizes = product.getSize().split(",");
                            for (String size : sizes) {
                                size = size.trim().toUpperCase();
                                String sizeBasedBaseId = baseId + "_" + size + "_" + idx;
                                int sizeSuffix = productMapper.findMaxSuffix(sizeBasedBaseId) + 1;
                                productId = sizeBasedBaseId + "_" + String.format("%02d", sizeSuffix);

                                // 최종 중복 확인 루프
                                while (isDuplicateProductId(productId)) {
                                    sizeSuffix = productMapper.findMaxSuffix(sizeBasedBaseId) + 1;
                                    productId = sizeBasedBaseId + "_" + String.format("%02d", sizeSuffix);
                                }

                                product.setProduct_id(productId);
                                product.setSize(size);
                                productMapper.insertProduct(product);
                            }
                        }
                        break;

                    default:
                        throw new IllegalArgumentException("Invalid management type: " + product.getManagement_type());
                }
                System.out.println("Registered product with product_id = " + product.getProduct_id());
            } catch (Exception e) {
                System.err.println("Error registering product: " + e.getMessage());
                throw e;
            }
        }
    }




    public void updateProduct(ProductVO product) {
        productMapper.modify(product);
    }

    public void deleteProduct(String productId) {
        productMapper.removeProduct(productId);
    }

    public List<ProductVO> getAllProducts() {
        return productMapper.getAllProducts();
    }

    public ProductVO getProductById(String productId) {
        return productMapper.getProductById(productId);
    }

    public List<ProductVO> getProductsByFacilityId(String facilityId) {
        return productMapper.getProductsByFacilityId(facilityId);
    }

}
