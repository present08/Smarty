package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class NotificationVO {
    private String notification_id;
    private String user_id;
    private String message;
    private LocalDate send_date;
}
