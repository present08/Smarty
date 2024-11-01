package com.green.smarty.service;

import com.green.smarty.mapper.RentalMapper;
import com.green.smarty.vo.RentalVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class RentalServiceImpl implements RentalService{
    @Autowired
    private RentalMapper rentalMapper;

    @Override
    public List<RentalVO> getProductRentalStatus(Long facilityId, String date) {
        return rentalMapper.getProductRentalStatus(facilityId, date);
    }

    @Override
    public List<Map<String, Object>> getRentalsByUserId(String userId) {
        return rentalMapper.getRentalsByUserId(userId); // 쿼리 호출만 수행
    }
}
