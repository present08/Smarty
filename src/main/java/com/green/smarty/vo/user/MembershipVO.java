package com.green.smarty.vo.user;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder

public class MembershipVO {
    private String membership_id;
    private String membership_level;
    private String user_id;
}
