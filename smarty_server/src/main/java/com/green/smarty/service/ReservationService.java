package com.green.smarty.service;


import com.green.smarty.mapper.ReservationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ReservationService {
  @Autowired
  private ReservationMapper reservationMapper;

  public List<Map<String, Object>> getReservationsByUserId(String userId) {
    return reservationMapper.getReservationsByUserId(userId);
  }
}
