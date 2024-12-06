package com.green.smarty.service;

import com.green.smarty.dto.SecurityUserDTO;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.vo.UserVO;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityService implements UserDetailsService {

    private final UserMapper userMapper;

    public SecurityService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public SecurityUserDTO loadUserByUsername(String user_id) throws UsernameNotFoundException {
        UserVO userVO = userMapper.getById(user_id);
        if(userVO == null) {
            throw new UsernameNotFoundException("ID에 해당하는 사용자를 찾을 수 없습니다. " + user_id);
        }
        return new SecurityUserDTO(userVO);
    }
}
