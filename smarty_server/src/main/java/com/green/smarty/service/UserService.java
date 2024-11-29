package com.green.smarty.service;

import com.green.smarty.dto.ProductRentalMyPageUserDTO;
import com.green.smarty.dto.UserClassApplicationDTO;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder; // PasswordEncoder 주입

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private QRCodeService qrCodeService;

    @Autowired
    private FCMService fcmService;

    // 회원가입
//    public boolean signup(UserVO user) {
//        try {
//            // 이메일 및 사용자 ID 중복 체크
//            if (userMapper.getById(user.getUser_id()) != null || userMapper.getByEmail(user.getEmail()) != null) {
//                System.out.println("Email, Id 중복");
//                return false; // 중복된 경우 false 반환
//            } else {
//                // 사용자 추가
//                userMapper.insertUser(user);
//                System.out.println("회원등록성공");
//
//                //QR 코드 생성
//                byte[] qrCode = qrCodeService.generateQRCode(user.getEmail());  // 사용자 이메일을 QR 코드 데이터로 사용
//                System.out.println("코드생성 완료 : "+qrCode);
//
//                //QR 코드를 UserVO 객체에 저장
//                user.setQrCode(qrCode);
//
//                //QR 코드를 포함한 사용자 정보를 업데이트
//                userMapper.updateUserWithQRCode(user);
//                System.out.println("업데이트_완료 : "+user.getQrCode());
//
//                return true;
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            // 오류 발생 시 false 반환
//            return false;
//        }
//    }

    // 회원가입
    public boolean signup(UserVO user) {
        try {
            // 비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(user.getPassword());

            // 빌더 패턴을 사용하여 UserVO 객체 생성
            UserVO newUser = UserVO.builder()
                    .user_id(user.getUser_id())
                    .user_name(user.getUser_name())
                    .email(user.getEmail())
                    .password(encodedPassword) // 암호화된 비밀번호 설정
                    .phone(user.getPhone())
                    .address(user.getAddress())
                    .birthday(user.getBirthday())
                    .join_date(LocalDateTime.now())
                    .login_date(LocalDate.now())
                    .user_status(true)
                    .fcmToken(user.getFcmToken())
                    .build();

            // 이메일 및 사용자 ID 중복 체크
            if (userMapper.getById(newUser.getUser_id()) != null || userMapper.getByEmail(newUser.getEmail()) != null) {
                System.out.println("Email, Id 중복");
                return false; // 중복된 경우 false 반환
            } else {
                // 사용자 추가
                userMapper.insertUser(newUser);
                System.out.println("회원등록성공");

                // QR 코드 생성
                byte[] qrCode = qrCodeService.generateQRCode(newUser.getEmail());
                System.out.println("코드생성 완료 : " + qrCode);

                // QR 코드를 UserVO 객체에 저장
                newUser.setQrCode(qrCode);

                // QR 코드를 포함한 사용자 정보를 업데이트
                userMapper.updateUserWithQRCode(newUser);
                System.out.println("업데이트_완료 : " + newUser.getQrCode());

                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // 오류 발생 시 false 반환
        }
    }

    //QR 코드 조회
    public byte[] getQRCode(String userId) {
        UserVO userVO = userMapper.getById(userId);
        return userVO.getQrCode();
    }

    // 로그인
    public UserVO login(String user_id, String password) {
        UserVO user = userMapper.getById(user_id);
        if (user != null && user.getPassword().equals(password)) {
            System.out.println("존재하는 회원입니다 : " + user_id);
            return user;
        } else {
            //로그인 실패
            System.out.println("로그인 실패");
            return null;
        }
    }

    public void updateLoginDate(String userId) {
        userMapper.updateLoginDate(userId); // 로그인 날짜 업데이트 호출
    }

    // 아이디 찾기
    public String findByID(String email, String user_name) {
        System.out.println("서비스에서 찾는 이메일: " + email);
        return userMapper.findByID(email, user_name);
    }

    // 비밀번호 찾기
    public boolean resetPassword(String user_id, String user_name, String phone) {
        // 사용자가 입력한 아이디로 사용자 조회
        UserVO user = userMapper.getById(user_id);
        // null 체크 (사용자가 존재하지 않는 경우)
        if (user == null) {
            return false;
        }

        // 이름과 전화번호가 일치하는지 확인
        if (user.getUser_name().equals(user_name) && user.getPhone().equals(phone)) {
            System.out.println("사용자정보가 일치합니다");
            return true;
        } else {
            System.out.println("사용자정보가 다릅니다");
            return false;
        }
    }

    // 비밀번호 변경
    public boolean updatePassword(String user_id, String newPassword ) {
        // 사용자가 입력한 아이디로 사용자 조회
        UserVO user = userMapper.getById(user_id);
        // 비밀번호를 UserVO 객체에 설정
        user.setPassword(newPassword); // 비밀번호 필드 업데이트
        // 비밀번호를 데이터베이스에 업데이트
        int updatedRows = userMapper.updatePassword(user);
        System.out.println(updatedRows);
        return updatedRows > 0; // 성공적으로 업데이트되었는지 확인
    }

    // 휴면계정
    public String checkUserStatus(String userId) {
        UserVO user = userMapper.findUserById(userId);

        LocalDate loginDate = user.getLogin_date();
        LocalDate currentDate = LocalDate.now();

        long monthsBetween = ChronoUnit.MONTHS.between(loginDate,currentDate);

        boolean isDormant = monthsBetween >= 3;
        user.setUser_status(!isDormant);
        System.out.println(isDormant);

        userMapper.updateUserStatus(userId, user.isUser_status());

        return isDormant ? "휴면" : "활성유저";
    }

    // 유저정보 수정 업데이트
    public String updateUserProfile(UserVO userVO) {
        int result = userMapper.updateUserInfo(userVO);
        return result > 0 ? "회원 정보 수정 성공" : "회원 정보 수정 실패";
    }

    // 레벨 구분하기
    public void updateUserLevel (UserVO userVO, BigDecimal totalAmount) {
        if (totalAmount.compareTo(new BigDecimal("1500000")) >= 0) {
            userVO.setLevel("Diamond");
        } else if (totalAmount.compareTo(new BigDecimal("1000000")) >= 0) {
            userVO.setLevel("Platinum");
        }else if (totalAmount.compareTo(new BigDecimal("500000")) >= 0) {
            userVO.setLevel("Gold");
        }else if (totalAmount.compareTo(new BigDecimal("300000")) >= 0) {
            userVO.setLevel("Silver");
        }else {
            userVO.setLevel("일반");
        }
    }

    // 등록한 클래스 정보 가져오기
    public List<UserClassApplicationDTO> getClassUserApplication (String user_id) {
        List<UserClassApplicationDTO> result = userMapper.getClassUserApplication(user_id);
        return result;
    }

    // 대여 리스트 가져오기
    public List<ProductRentalMyPageUserDTO> getUserMyPageRentalListData(String user_id) {
        System.out.println(user_id);
        List<ProductRentalMyPageUserDTO> result = userMapper.getUserMyPageRentalListData(user_id);
        return result;
    }
}