package com.green.smarty.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id;
    private long ino;
    private String pw;
    private String email;
    private String name;
    private LocalDateTime join_date;
}
