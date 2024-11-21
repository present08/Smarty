package com.green.smarty.mapper;

import com.green.smarty.dto.ClassAdminDTO;
import com.green.smarty.vo.ClassDetailVO;
import com.green.smarty.vo.CourtVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminClassMapper {
    void register(ClassAdminDTO classAdminDTO);
    void registerDetail(ClassDetailVO classDetailVO);
    List<ClassAdminDTO> getList();
    ClassAdminDTO read(String class_id);
}
