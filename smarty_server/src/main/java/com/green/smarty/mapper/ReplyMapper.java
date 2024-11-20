package com.green.smarty.mapper;

import com.green.smarty.dto.ReplyDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {
    // ReplyDTO에서 int로 반환 타입 변경
    int insertReply(ReplyDTO replyDTO);
    List<ReplyDTO> getCommentsByBoardId(int board_id);
}