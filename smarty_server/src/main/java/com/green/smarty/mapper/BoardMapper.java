package com.green.smarty.mapper;

import com.green.smarty.dto.BoardDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {
//    게시글 등록
    int insertBoard(BoardDTO boardDTO);
//    board_id로 게시글 조회
    BoardDTO selectBoardById(int board_id);
//    board_id로 게시글 삭제
    int removeBoard(int board_id);
//    send_date 순서대로 게시글 전체 조회
    List<BoardDTO> selectAllBoard();
    // 조회수 증가 메서드
    int updateViewCount(@Param("board_id") int board_id);
}
