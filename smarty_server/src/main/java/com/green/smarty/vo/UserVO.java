package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserVO {

    private String user_id;
    private String user_name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private LocalDate birthday;
    private LocalDateTime join_date;
    private LocalDate login_date;
    private boolean user_status;
    private byte[] qrCode;
    private String level;
    private String fcm_token;

    // 사용자 ID에 대한 getter
    public String getUserId() {
        return user_id; // user_id에 대한 getter
    }

    // 사용자 이름에 대한 getter
    public String getUserName() {
        return user_name; // user_name에 대한 getter
    }

    // 가입 날짜에 대한 getter
    public LocalDateTime getJoinDate() {
        return join_date; // join_date에 대한 getter
    }

    // 로그인 날짜에 대한 getter
    public LocalDate getLoginDate() {
        return login_date; // login_date에 대한 getter
    }

    // 사용자 상태에 대한 getter
    public boolean isUserStatus() {
        return user_status; // user_status에 대한 getter
    }

}
