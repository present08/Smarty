package com.green.smarty.vo;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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

}
