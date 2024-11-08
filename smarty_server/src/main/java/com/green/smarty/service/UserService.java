package com.green.smarty.service;


import com.green.smarty.vo.UserVO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    Long register(UserVO vo);
    public List<UserVO> getAllUsers();
    UserVO getUserByName(String username);
    UserVO login(String user_name, String password);
}
