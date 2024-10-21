package com.green.smarty.service;

import com.green.smarty.domain.User;
import com.green.smarty.dto.PageRequestDTO;
import com.green.smarty.dto.PageResponseDTO;
import com.green.smarty.dto.UserDTO;
import java.util.List;

public interface UserService {

    // 사용자 하나 조회
    UserDTO getUser(String id);

    // 페이징 처리 적용 사용자 전체 조회
    PageResponseDTO<UserDTO> userList(PageRequestDTO pageRequestDTO);
}
