package com.green.smarty.service.user;

import com.green.smarty.mapper.user.UserMapper;
import com.green.smarty.vo.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@Transactional
public class UserServiceImpl implements UserService{
    @Autowired
    private UserMapper userMapper;

    @Override
    public String checkUserStatus(String userId) {
        UserVO user = userMapper.findUserById(userId);

        LocalDate loginDate = user.getLogin_date();
        LocalDate currentDate = LocalDate.now();

        long monthsBetween = ChronoUnit.MONTHS.between(loginDate,currentDate);

        boolean isDormant = monthsBetween >= 3;
        user.setUser_status(!isDormant);

        userMapper.updateUserStatus(userId, user.isUser_status());

        return isDormant ? "휴면" : "활성유저";
    }
}
