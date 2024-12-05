package com.green.smarty.service;

import com.green.smarty.mapper.LoginHistoryMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class LoginHistoryService {
    @Autowired
    private LoginHistoryMapper loginHistoryMapper;

    public void insertSentHumanMessageByUserId(String user_id){
        loginHistoryMapper.insertOrUpdateSentHumanMessageByUserId(user_id);
    }
}
