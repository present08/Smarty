package com.green.smarty.mapper;

import com.green.smarty.dto.FacilityAdminDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminFacilityMapper {

    void register(FacilityAdminDTO facilityAdminDTO);
    void fileUpload(String facility_id, String origin_path, String thumbnail_path, String file_name);
    List<FacilityAdminDTO> getList();
    FacilityAdminDTO read(String facility_id);
    void modify(FacilityAdminDTO facilityAdminDTO);
    void remove(String id);
}
