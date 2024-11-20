package com.green.smarty.service;

import com.green.smarty.dto.BoardDTO;
import com.green.smarty.mapper.BoardMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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

    // 게시글 삭제
    public void removeBoard(int board_id){
        BoardDTO boardDTO = boardMapper.selectBoardById(board_id);
        if(boardDTO == null){
            throw  new IllegalArgumentException("삭제할 대상이 존재하지 않습니다");
        }
        boardMapper.removeBoard(board_id);
    }
    // 게시글 전체 조회
    public List<BoardDTO> selectAllBoard(){
        return boardMapper.selectAllBoard();
    }

    // 삭제되지 않은 게시글 전체 조회
    public List<BoardDTO> getVisibleBoards() {
        return boardMapper.getVisibleBoards();
    }

    // 조회수 증가
    public int updateViewCount(int board_id) {
        return boardMapper.updateViewCount(board_id);
    }

    // 게시글 수정
    public int updateBoardById(int board_id, String title, String content, String content_type) {
        BoardDTO board = boardMapper.selectBoardById(board_id);
        if (board == null || board.getIs_deleted() == 1) {
            throw new NoSuchElementException("수정할 게시글이 존재하지 않습니다. ID: " + board_id);
        }
        return boardMapper.updateBoardById(board_id, title, content, content_type);
    }


    // 조건부 검색
    public List<BoardDTO> searchBoard(String type, String keyword){
        return boardMapper.searchBoard(keyword, type);
    }

    // 좋아요 증가
    public int updateGood(int board_id){
        return boardMapper.updateGood(board_id);
    }

    // 싫어요 증가
    public int updateBad(int board_id){
        return boardMapper.updateBad(board_id);
    }

    // 게시글 삭제 날짜 저장
    public int deletedDate(int board_id){
        return boardMapper.deletedDate(board_id);
    }

}
