package com.green.smarty.service;

import com.green.smarty.dto.ReplyDTO;
import com.green.smarty.mapper.ReplyMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ReplyService {
    @Autowired
    private ReplyMapper replyMapper;

    public ReplyDTO insertReply(ReplyDTO replyDTO) {
        // insert 후 영향받은 행의 수를 반환
        int result = replyMapper.insertReply(replyDTO);
        if (result > 0) {
            // 성공적으로 삽입된 경우 replyDTO 반환
            return replyDTO;
        }
        throw new RuntimeException("댓글 작성에 실패했습니다.");
    }

    public List<ReplyDTO> getCommentsByBoardId(int board_id) {
        return replyMapper.getCommentsByBoardId(board_id);
    }
}