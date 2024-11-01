package com.green.smarty.mapper.product;

import com.green.smarty.mapper.facility.FacilityMapper;
import com.green.smarty.vo.facility.FacilityVO;
import com.green.smarty.vo.product.ProductVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.IntStream;

@SpringBootTest
public class ProductMapperTests {
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private FacilityMapper facilityMapper;
    @Autowired
    private SizeMapper sizeMapper;


    @Test
    public void dummyProductInsert(){
        // 데이터베이스에서 모든 시설 정보를 가져오기
        List<FacilityVO> facilities = facilityMapper.getAllFacilities();

        // 시설별 대여물품 등록
        for (FacilityVO facility : facilities) {
            String facilityId = facility.getFacility_id();

            // 대여물품 목록
            String[] productNames = {"유니폼", "운동화", "수건", "사물함", "필수품"};
            int[] productPrices = {10000, 15000, 2000, 5000, 30000}; // 필수품의 가격은 적절히 설정

            // 각 대여물품을 등록
            IntStream.range(0, productNames.length).forEach(i -> {
                String productId = "";
                String productName = productNames[i];
                int price = productPrices[i];

                // 각 품목에 대해 고유한 ID 생성
                switch (i) {
                    case 0: // 유니폼
                        productId = facilityId + "_uniform";
                        break;
                    case 1: // 운동화
                        productId = facilityId + "_shoes";
                        break;
                    case 2: // 수건
                        productId = facilityId + "_towel";
                        break;
                    case 3: // 사물함
                        productId = facilityId + "_locker";
                        break;
                    case 4: // 필수품
                        productId = facilityId + "_essential";
                        break;
                }

                // 필수품의 경우 시설에 맞는 제품 이름 설정
                if (i == 4) { // 필수품
                    switch (facility.getFacility_name()) {
                        case "수영장":
                            productName = "킥판";
                            break;
                        case "실내 농구장":
                            productName = "농구공";
                            break;
                        case "스크린 골프":
                            productName = "골프채";
                            break;
                        case "배드민턴장":
                            productName = "배드민턴 라켓";
                            break;
                        case "탁구장":
                            productName = "탁구 라켓";
                            break;
                        case "실내 풋살장":
                            productName = "풋살공";
                            break;
                        case "스쿼시 코트":
                            productName = "스쿼스 라켓";
                            break;
                        case "헬스장":
                        case "필라테스":
                        case "실내 클라이밍장":
                            // 필수품이 없는 시설의 경우 등록하지 않음
                            return; // 이 경우, 현재 인덱스의 루프를 종료하고 다음으로 넘어갑니다.
                    }
                }

                // 대여물품 등록
                productMapper.register(ProductVO.builder()
                        .product_id(productId)
                        .facility_id(facilityId)
                        .product_name(productName)
                        .price(price)
                        .build());
            });
        }
    }
}
