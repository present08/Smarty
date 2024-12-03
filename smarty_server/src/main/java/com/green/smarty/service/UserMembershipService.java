package com.green.smarty.service;

import com.green.smarty.dto.TotalMembershipDTO;
import com.green.smarty.mapper.UserMembershipMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserMembershipService {

    @Autowired
    UserMembershipMapper userMembershipMapper;

    public List<TotalMembershipDTO> getPaymentDetailsByUserId(String user_id) {
        List<TotalMembershipDTO> result = userMembershipMapper.getPaymentDetailsByUserId(user_id);
        return result;
    }

}
