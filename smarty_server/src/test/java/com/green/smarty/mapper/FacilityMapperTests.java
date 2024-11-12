package com.green.smarty.mapper;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Log4j2
public class FacilityMapperTests {

    @Autowired
    private FacilityMapper facilityMapper;

    @Test
    public void list() {
        List<FacilityDTO> list = facilityMapper.list();
        log.info("시설 조회 테스트! list = " + list);
    }

    @Test
    public void get() {
        FacilityDTO oldDTO = facilityMapper.get("fc_1729757209803");
        log.info("시설 하나 조회! oldDTO = " + oldDTO);
    }
}
