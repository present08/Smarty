package com.green.smarty.mapper.facility;

import com.green.smarty.vo.facility.FacilityVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalTime;


@SpringBootTest
public class FacilityMapperTests {
    @Autowired
    private FacilityMapper facilityMapper;

    @Test
    public void dummyFacilityInsert() {
            facilityMapper.register(new FacilityVO("Facility1","헬스장", 5000, 7000, LocalTime.of(9, 0), LocalTime.of(22, 0)));
            facilityMapper.register(new FacilityVO("Facility2","수영장", 8000, 10000, LocalTime.of(9, 0), LocalTime.of(21, 0)));
            facilityMapper.register(new FacilityVO("Facility3","실내 농구장", 10000, 13000, LocalTime.of(10, 0), LocalTime.of(23, 0)));
            facilityMapper.register(new FacilityVO("Facility4","배드민턴장", 6000, 8000, LocalTime.of(9, 0), LocalTime.of(21, 0)));
            facilityMapper.register(new FacilityVO("Facility5","탁구장", 4000, 6000, LocalTime.of(9, 0), LocalTime.of(20, 0)));
            facilityMapper.register(new FacilityVO("Facility6","스크린 골프", 15000, 18000, LocalTime.of(9, 0), LocalTime.of(23, 0)));
            facilityMapper.register(new FacilityVO("Facility7","필라테스", 7000, 9000, LocalTime.of(9, 0), LocalTime.of(21, 0)));
            facilityMapper.register(new FacilityVO("Facility8","실내 풋살장", 12000, 15000, LocalTime.of(10, 0), LocalTime.of(23, 0)));
            facilityMapper.register(new FacilityVO("Facility9","스쿼시 코트", 6000, 8000, LocalTime.of(9, 0), LocalTime.of(22, 0)));
            facilityMapper.register(new FacilityVO("Facility10","실내 클라이밍장", 7000, 9000, LocalTime.of(9, 0), LocalTime.of(22, 0)));
    }
}
