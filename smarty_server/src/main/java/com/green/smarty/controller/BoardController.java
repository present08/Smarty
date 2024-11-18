package com.green.smarty.controller;

import com.green.smarty.dto.BoardDTO;
import com.green.smarty.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/notice/board/user")
public class BoardController {
    @Autowired
    private BoardService boardService;

    @PostMapping("/write")
    public ResponseEntity<BoardDTO> insertBoard(@RequestBody BoardDTO boardDTO, HttpServletRequest request) {
        try {
            String ip = request.getHeader("X-Forwarded-For");
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getRemoteAddr();
            }
            boardDTO.setIp_address(ip);
            int result = boardService.insertBoard(boardDTO);
            if (result > 0) {
                BoardDTO created = boardService.selectBoardById(boardDTO.getBoard_id());
                return ResponseEntity.ok(created);
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Error creating announcement : ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/list")
    public List<BoardDTO> selectAllBoard() {
        return boardService.selectAllBoard();
    }

    // 게시글 삭제
    @DeleteMapping("/delete/{board_id}")
    public ResponseEntity<Void> removeBoard(@PathVariable int board_id) {
        try {
            boardService.removeBoard(board_id);
            log.info("데이터 삭제 성공");
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Error deleting board : ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/detail/{board_id}")
    public ResponseEntity<BoardDTO> selectBoardById(@PathVariable int board_id) {
        try {
            BoardDTO boardDTO = boardService.selectBoardById(board_id);
            return ResponseEntity.ok(boardDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error retrieving board detail:", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    // 조회수 증가
    @PostMapping("/view/{board_id}")
    public ResponseEntity<Void> updateViewCount(@PathVariable int board_id) {
        try {
            boardService.updateViewCount(board_id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error incrementing view count: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 게시글 수정
    @PutMapping("/modify/{boardId}")
    public ResponseEntity<String> updateBoard(
            @PathVariable("boardId") int boardId,
            @RequestBody BoardDTO request) {

        boardService.updateBoardById(boardId, request.getTitle(), request.getContent(), request.getContent_type());
        return ResponseEntity.ok("게시글이 성공적으로 업데이트되었습니다.");
    }

    // 삭제되지 않은 게시글 전체 조회
    @GetMapping("/nodeletelist")
    public List<BoardDTO> getVisibleBoards() {
        return boardService.getVisibleBoards();
    }

}