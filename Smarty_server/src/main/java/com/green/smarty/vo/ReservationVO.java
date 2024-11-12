package com.green.smarty.vo;

import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder
<<<<<<< HEAD:Smarty_server/src/main/java/com/green/smarty/vo/ReservationVO.java

public class ReservationVO {
    private String reservation_id;
    private String user_id;
    private String court_id;
=======
public class ReservationVO {

    private String reservation_id;
    private String user_id;
    private String court_id;

>>>>>>> main:smarty_server/src/main/java/com/green/smarty/vo/ReservationVO.java
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reservation_start;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reservation_end;
<<<<<<< HEAD:Smarty_server/src/main/java/com/green/smarty/vo/ReservationVO.java
=======

>>>>>>> main:smarty_server/src/main/java/com/green/smarty/vo/ReservationVO.java
}
