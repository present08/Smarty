package com.green.smarty.vo.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LoginhistoryVO {
    private Integer id;
    private String userId;
    private LocalDateTime loginDt; // 로그인 날짜
    private String clientIp;
    private String userAgent;
}
