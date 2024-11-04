package com.green.smarty.service;

import com.green.smarty.dto.CourtDTO;
import com.green.smarty.dto.ProductDTO;
import com.green.smarty.mapper.CourtMapper;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Log4j2
public class CourtService {

    @Autowired
    private CourtMapper courtMapper;

    public int register(CourtDTO courtDTO) {
        int id = courtMapper.register(courtDTO);
        return id;
    }

    public List<CourtDTO> getList() {
        return courtMapper.getList();
    }

    public CourtDTO read(int court_id) {
        return courtMapper.read(court_id);
    }
}
