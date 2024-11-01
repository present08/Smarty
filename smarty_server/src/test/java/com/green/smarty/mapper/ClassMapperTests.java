package com.green.smarty.mapper;

import com.green.smarty.mapper.facility.FacilityMapper;
import com.green.smarty.vo.ClassVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@SpringBootTest
public class ClassMapperTests {
    @Autowired
    private ClassMapper classMapper;

    @Autowired
    private FacilityMapper facilityMapper;

    @Test
    public void dummyClassInsert() {
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility1", "헬스 기초 수업", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Mon, Wed, Fri", LocalTime.of(9, 0), LocalTime.of(10, 0), 100000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility2", "초급 수영 강좌", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Tue, Thu", LocalTime.of(10, 0), LocalTime.of(11, 0), 120000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility3", "농구 기본 스킬", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Sat", LocalTime.of(11, 0), LocalTime.of(12, 30), 150000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility4", "배드민턴 중급", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Wed, Fri", LocalTime.of(14, 0), LocalTime.of(15, 30), 80000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility5", "탁구 입문 강좌", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Mon, Wed", LocalTime.of(13, 0), LocalTime.of(14, 0), 70000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility6", "스크린 골프 실전", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Sat", LocalTime.of(12, 0), LocalTime.of(13, 30), 180000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility7", "필라테스 입문", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Mon, Wed", LocalTime.of(9, 30), LocalTime.of(10, 30), 90000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility8", "풋살 기술 향상", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Sun", LocalTime.of(16, 0), LocalTime.of(17, 30), 150000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility9", "스쿼시 고급반", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Tue, Thu", LocalTime.of(18, 0), LocalTime.of(19, 0), 100000));
        classMapper.register(new ClassVO(UUID.randomUUID().toString(), "Facility10", "클라이밍 기초", LocalDate.of(2024, 10, 20), LocalDate.of(2024, 12, 20), "Mon, Wed, Fri", LocalTime.of(14, 0), LocalTime.of(15, 30), 110000));
    }
}
