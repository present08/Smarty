package com.green.smarty;

import com.green.smarty.dto.RentalDTO;
import com.green.smarty.mapper.UserRentalMapper;
import com.green.smarty.vo.RentalVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Slf4j
@SpringBootTest
public class RentalDummyTest {

    @Autowired
    private UserRentalMapper rentalMapper;

    @Test
    public void insertDummyRentals() {
        // 1. 유저와 예약에서 사용된 데이터
        List<String> userIds = List.of("choi", "jo", "kim", "kim2", "kim3", "ysh");
        List<String> productIds = List.of("p_001701", "p_168001", "p_288001", "p_764601", "p_764602");
        Random random = new Random();

        // 2. 랜덤으로 대여 데이터 생성
        for (String userId : userIds) {
            int rentalCount = random.nextInt(6) + 5; // 유저당 5~10개의 대여
            for (int i = 0; i < rentalCount; i++) {
                String productId = productIds.get(random.nextInt(productIds.size()));

                // 3. 대여 가능한 상태 조회
                List<String> availableStatuses = rentalMapper.getAvailableStatusIds(productId, 1);
                if (availableStatuses.isEmpty()) {
                    log.warn("No available statuses for product_id: {}", productId);
                    continue;
                }

                // 4. 랜덤 대여 데이터 생성
                String statusId = availableStatuses.get(0);
                RentalVO rental = RentalVO.builder()
                        .rental_id("R_" + System.currentTimeMillis()) // 고유 ID
                        .user_id(userId)
                        .product_id(productId)
                        .rental_date(LocalDateTime.now())
                        .return_date(LocalDateTime.now().plusDays(random.nextInt(7) + 1)) // 1~7일 후 반납
                        .rental_status(true)
                        .count(1)
                        .build();

                // 5. 대여 데이터 삽입
                try {
                    rentalMapper.insertRental(rental);

                    // 6. 로그 생성
                    rentalMapper.insertRentalLogWithRentalId(
                            Map.of(
                                    "rental_id", rental.getRental_id(),
                                    "status_id", statusId,
                                    "changed_status", "대여 중",
                                    "change_quantity", 1
                            )
                    );
                    log.info("Inserted rental: {}", rental);
                } catch (Exception e) {
                    log.error("Failed to insert rental: {}", rental, e);
                }
            }
        }
    }
}
