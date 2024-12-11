package com.green.smarty.service;

import com.green.smarty.dto.RentalDTO;
import com.green.smarty.mapper.AdminProductMapper;
import com.green.smarty.mapper.AdminRentalMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminRentalService {
    @Autowired
    private AdminRentalMapper adminRentalMapper;

    @Autowired
    private AdminProductMapper adminProductMapper;

    public List<RentalDTO> getRentalsByProductId(String product_id) {
        return adminRentalMapper.getRentalsByProductId(product_id);
    }
}
