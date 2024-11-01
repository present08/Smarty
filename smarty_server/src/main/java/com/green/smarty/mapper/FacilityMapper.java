package com.green.smarty.mapper;

import com.green.smarty.dto.FacilityDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FacilityMapper {

    void register(FacilityDTO facilityDTO);
    void fileUpload(String facility_id, String file_name);
    List<FacilityDTO> list();
    FacilityDTO get(String id);
//    void modify(FacilityDTO facilityDTO);
//    void remove(String id);
}
