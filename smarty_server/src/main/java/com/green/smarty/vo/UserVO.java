package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class UserVO {
    private Long user_id;
    private String user_name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private LocalDate birthday;
    private String level;
}
