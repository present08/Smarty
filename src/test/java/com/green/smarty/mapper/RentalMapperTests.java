package com.green.smarty.mapper;

import com.green.smarty.mapper.product.QuantityMapper;
import com.green.smarty.mapper.user.UserMapper;
import com.green.smarty.vo.RentalVO;
import com.green.smarty.vo.product.QuantityVO;
import com.green.smarty.vo.user.UserVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@SpringBootTest
public class RentalMapperTests {
    @Autowired
    private RentalMapper rentalMapper;

    @Autowired
    private QuantityMapper quantityMapper;

    @Autowired
    private UserMapper userMapper;

    @Test
    public void dummyRentalInsert() {
        List<UserVO> users = userMapper.getAllUsers();
        List<QuantityVO> quantities = quantityMapper.getAllQuantities();

        Random random = new Random();

        for (int i = 0; i < 100; i++) {
            UserVO randomUser = users.get(random.nextInt(users.size()));
            QuantityVO randomQuantity = quantities.get(random.nextInt(quantities.size()));

            rentalMapper.register(new RentalVO(UUID.randomUUID().toString(), randomUser.getUser_id(),
                    randomQuantity.getQuantity_id(), LocalDateTime.of(2024, 10, 30, 18, 30),
                    LocalDateTime.of(2024, 10, 30, 20, 30)));
        }
    }
}
