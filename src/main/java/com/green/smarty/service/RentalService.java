package com.green.smarty.service;

import com.green.smarty.vo.RentalVO;

import java.util.List;
import java.util.Map;

public interface RentalService {
    List<RentalVO> getProductRentalStatus(Long facilityId, String date);
    List<Map<String, Object>> getRentalsByUserId(String userId);

}
