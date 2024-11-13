package com.green.smarty.mapper;

import com.green.smarty.dto.CourtAdminDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminCourtMapper {
    void register(CourtAdminDTO courtAdminDTO);

    List<CourtAdminDTO> getList();

    CourtAdminDTO read(int court_id);
}
