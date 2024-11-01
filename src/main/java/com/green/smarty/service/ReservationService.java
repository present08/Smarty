package com.green.smarty.service;


import java.util.List;
import java.util.Map;

public interface ReservationService {
  List<Map<String, Object>> getReservationsByUserId(String userId);
}
