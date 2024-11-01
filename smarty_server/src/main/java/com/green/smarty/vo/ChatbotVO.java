package com.green.smarty.vo;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class ChatbotVO {
    private String chat_room;
    private String user_id;
    private String question;
    private String answer;
    private String message;
    private boolean status;
}
