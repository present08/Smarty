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
    void removeBoard(int board_id);
//    send_date 순서대로 게시글 전체 조회
    List<BoardDTO> selectAllBoard();
    // 조회수 증가 메서드
    int updateViewCount(@Param("board_id") int board_id);
    // board_id로 게시글 수정
    int updateBoardById(@Param("board_id") int boar_id,
                        @Param("title") String title,
                        @Param("content") String content,
                        @Param("contentType") String contentType);
//    삭제되지 않은 게시글 전체 조회
    List<BoardDTO> getVisibleBoards();
    // 조건부 검색
    List<BoardDTO> searchBoard (@Param("keyword") String keyword, @Param("type") String type);

    // 좋아요 증가
    int updateGood(@Param("board_id") int board_id);

    // 싫어요 증가
    int updateBad(@Param("board_id") int board_id);

    // board_id를 매개변수로 int 반환
    int deletedDate(@Param("board_id") int board_id);
}
