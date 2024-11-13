package com.green.smarty.mapper;

import com.green.smarty.dto.FacilityAdminDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminFacilityMapper {

    void register(FacilityAdminDTO facilityAdminDTO);

    void fileUpload(Map filesUpload);

    List<FacilityAdminDTO> getList();

    FacilityAdminDTO read(String facility_id);

    void modify(FacilityAdminDTO facilityAdminDTO);

    void remove(String id);
}
