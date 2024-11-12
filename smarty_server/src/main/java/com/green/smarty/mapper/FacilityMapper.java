package com.green.smarty.mapper;

import com.green.smarty.dto.FacilityDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FacilityMapper {

    void register(FacilityDTO facilityDTO);
    void fileUpload(String facility_id, String origin_path, String thumbnail_path, String file_name);
    List<FacilityDTO> getList();
    FacilityDTO read(String facility_id);
    void modify(FacilityDTO facilityDTO);
    void remove(String id);
}
