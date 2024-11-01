package com.green.smarty.mapper.facility;

import com.green.smarty.vo.facility.CourtVO;
import com.green.smarty.vo.facility.FacilityVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.IntStream;

@SpringBootTest

public class CourtMapperTests {
    @Autowired
    private FacilityMapper facilityMapper;
    @Autowired
    private CourtMapper courtMapper;

    @Test
    public void dummyCourtInsert() {
        // 모든 시설 정보를 가져오기
        List<FacilityVO> facilities = facilityMapper.getAllFacilities();

        // 각 시설에 대해 코트 4개 생성
        facilities.forEach(facility -> {
            String facilityId = facility.getFacility_id();
            String facilityName = facility.getFacility_name();

            IntStream.rangeClosed(1, 4).forEach(i -> {
                // 코트 이름을 "시설명 + 코트 X" 형식으로 설정
                courtMapper.register(new CourtVO(facilityId + "_Court" + i, facilityName + " 코트 " + i, facilityId));
            });
        });

        // 추가적인 로직을 통해 코트가 성공적으로 등록되었는지 확인할 수 있습니다.
        // 예를 들어, courtMapper.getCourtsByFacilityId(facilityId) 등을 사용해 확인 가능
    }
}
