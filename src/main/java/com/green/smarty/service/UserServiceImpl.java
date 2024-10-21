package com.green.smarty.service;

import com.green.smarty.domain.User;
import com.green.smarty.dto.PageRequestDTO;
import com.green.smarty.dto.PageResponseDTO;
import com.green.smarty.dto.UserDTO;
import com.green.smarty.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public UserDTO getUser(String id) {
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow();
        UserDTO dto = modelMapper.map(user, UserDTO.class);
        return dto;
    }

    @Override
    public PageResponseDTO<UserDTO> userList(PageRequestDTO pageRequestDTO) {

        Pageable pageable =
                PageRequest.of(
                        pageRequestDTO.getPage() - 1,
                        pageRequestDTO.getSize(),
                        Sort.by("ino").descending());

        Page<User> result = userRepository.findAll(pageable);

        List<UserDTO> dtoList = result.getContent().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<UserDTO> responseDTO =
                PageResponseDTO.<UserDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(totalCount)
                        .build();

        return responseDTO;
    }
}
