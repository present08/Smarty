package com.green.smarty.mapper;

import com.green.smarty.mapper.user.UserMapper;
import com.green.smarty.vo.user.UserVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@SpringBootTest

public class UserMapperTests {
    @Autowired
    private UserMapper userMapper;

    // 10개의 주소를 미리 정의
    private static final String[] ADDRESSES = {
            "서울 강남구", "서울 서초구", "서울 관악구", "서울 종로구", "서울 중구",
            "경기 수원시", "경기 성남시", "부산 해운대구", "부산 사하구", "인천 남동구"
    };

    private static final String[] NAMES = {
            "김민수", "이재훈", "박지훈", "최영수", "정우성",
            "장지연", "김지혜", "이유리", "최유진", "정하늘",
            "한상민", "박소연", "정수빈", "이도현", "최민정",
            "홍길동", "이수민", "조민재", "김서연", "강민희",
            "차수빈", "하성민", "송하늘", "박준호", "김도현",
            "이채원", "전지현", "이혜원", "김하늘", "이하은",
            "한지혜", "오세훈", "서은비", "신동엽", "이승기",
            "강다니엘", "정해인", "김소현", "송강호", "박보검",
            "이병헌", "한석규", "조정석", "이준기", "공유"
    };

    private static final String[] LEVELS = {"silver", "gold", "platinum", "diamond"};
    private static final Random random = new Random();

    @Test
    public void dummyUserInsert() {
        IntStream.rangeClosed(1, 100).forEach(i -> {
            String userId = "user" + i;
            String userName = NAMES[random.nextInt(NAMES.length)];  // 랜덤으로 사용자 이름 선택
            String email = userId + "@naver.com";  // 이메일
            String password = "password" + random.nextInt(10000);  // 랜덤 비밀번호
            String phone = "010-" + String.format("%04d", random.nextInt(10000)) + "-" + String.format("%04d", random.nextInt(10000));  // 랜덤 전화번호
            String address = ADDRESSES[random.nextInt(ADDRESSES.length)];  // 랜덤 주소

            // 20대부터 60대까지 랜덤 생년월일 생성
            int age = random.nextInt(41) + 20;  // 20~60세
            LocalDate birthday = LocalDate.now().minusYears(age);  // 생년월일

            // 사용자 레벨 랜덤 부여
            String level = LEVELS[random.nextInt(LEVELS.length)];

            // userMapper.register로 직접 필드 넘기기
            userMapper.register(new UserVO(userId, userName, email, password, phone, address, birthday,
                    LocalDate.now(), LocalDate.now(), true, level));
        });
    }

    @Test
    public void updateLoginDateToRandomWithin5Months() {
        // 모든 사용자 데이터를 불러옵니다.
        List<UserVO> users = userMapper.getAllUsers();

        users.forEach(user -> {
            // 현재 날짜 기준으로 직전 5개월 내의 임의 날짜를 계산
            LocalDate maxDate = LocalDate.now();
            LocalDate minDate = maxDate.minusMonths(5);
            long daysBetween = ChronoUnit.DAYS.between(minDate, maxDate);
            // 직전 5개월 내의 임의 날짜 생성
            LocalDate randomLoginDate = minDate.plusDays(random.nextInt((int) daysBetween + 1));
            // 사용자 객체의 로그인 날짜를 랜덤하게 업데이트
            user.setLogin_date(randomLoginDate);
            userMapper.updateLoginDate(user.getUser_id(), randomLoginDate);
        });
    }

    @Test
    public void testUpdateUserStatusByLoginDate() {
        // user_status 업데이트
        int updatedRows = userMapper.updateUserStatusByLoginDate();
        System.out.println("Updated Rows: " + updatedRows);
        // 업데이트 후 결과 확인
        List<UserVO> users = userMapper.getAllUsers();
        users.forEach(user -> System.out.println("User ID: " + user.getUser_id() + ", Status: " + (user.isUser_status() ? "활성화" : "휴면")));
    }

    @Test
    public void testFindUserByIdAndCheckStatus() {
        String testUserId = "user13";  // 테스트할 user_id
        // 특정 user_id의 상태 확인
        UserVO user = userMapper.findUserById(testUserId);
        if (user != null) {
            System.out.println("User ID: " + user.getUser_id() + ", 상태: " + (user.isUser_status() ? "활동 중인 회원" : "휴면 계정입니다."));
        } else {
            System.out.println("User ID: " + testUserId + " 해당 ID는 존재하지 않습니다.");
        }
    }
}
