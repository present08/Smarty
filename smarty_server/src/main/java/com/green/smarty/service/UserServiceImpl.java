package com.green.smarty.service;

import com.green.smarty.mapper.UserMapper;
import com.green.smarty.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserMapper mapper;

    @Override
    public Long register(UserVO vo) {
        System.out.println("유저 확인"+vo);
        return mapper.register(vo);
    }

    @Override
    public List<UserVO> getAllUsers() {
        List<UserVO> userList = mapper.getAllUsers();
        return userList;
    }

    @Override
    public UserVO getUserByName(String user_name) {
        return mapper.getUserByName(user_name);
    }

    @Override
    public UserVO login(String username, String password) {
        UserVO user = mapper.getUserByName(username);
        if (user !=null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
