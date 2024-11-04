package com.green.smarty.mapper;

import com.green.smarty.dto.CourtDTO;
import com.green.smarty.dto.FacilityDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CourtMapper {
    int register(CourtDTO courtDTO);
    List<CourtDTO> getList();
    CourtDTO read(int court_id);
}
