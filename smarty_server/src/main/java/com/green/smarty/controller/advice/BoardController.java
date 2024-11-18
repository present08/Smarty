package com.green.smarty.controller.advice;

import com.green.smarty.dto.AnnounceDTO;
import com.green.smarty.dto.BoardDTO;
import com.green.smarty.mapper.BoardMapper;
import com.green.smarty.service.BoardService;
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
    public ResponseEntity<BoardDTO> insertBoard(@RequestBody BoardDTO boardDTO) {
        try {
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

    @GetMapping("/delete/{board_id}")
    public ResponseEntity<Void> removeBoard(int board_id) {
        try {
            boardService.removeBoard(board_id);
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
}