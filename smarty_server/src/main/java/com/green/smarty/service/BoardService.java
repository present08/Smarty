package com.green.smarty.service;

import com.green.smarty.dto.BoardDTO;
import com.green.smarty.mapper.BoardMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@Log4j2
public class BoardService {
    @Autowired
    private BoardMapper boardMapper;

//    게시글 작성
    public int insertBoard(BoardDTO boardDTO){
        try{
            int result = boardMapper.insertBoard(boardDTO);
            if(result > 0){
                log.info("Insert successful for board ID : " + boardDTO.getBoard_id());
            } else{
                log.info("Insert failed, no rows affected");
            }
            return result;
        } catch (Exception e){
            log.error("Insert failed : " , e);
            return 0;
        }
    }

//
    public BoardDTO selectBoardById(int board_id){
        BoardDTO boardDTO = boardMapper.selectBoardById(board_id);
        if(boardDTO == null){
            throw new NoSuchElementException("해당하는 아이디에 값이 없음요 : " + board_id);
        }
        return boardDTO;
    }

    public int removeBoard(int board_id){
        BoardDTO boardDTO = boardMapper.selectBoardById(board_id);
        if(boardDTO == null){
            throw  new IllegalArgumentException("삭제할 대상이 존재하지 않습니다");
        }
        return boardMapper.removeBoard(board_id);
    }

    public List<BoardDTO> selectAllBoard(){
        return boardMapper.selectAllBoard();
    }

    // 조회수 증가
    public int updateViewCount(int announce_id) {
        return boardMapper.updateViewCount(announce_id);
    }

}
