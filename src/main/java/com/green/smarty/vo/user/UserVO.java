package com.green.smarty.vo.user;

import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class UserVO {
    private String user_id;
    private String user_name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private LocalDate birthday;
    private LocalDate join_date;
    private LocalDate login_date;
    private boolean user_status;
    private String level;
}
