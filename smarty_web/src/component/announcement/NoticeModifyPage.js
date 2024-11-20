import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { noticeApi } from '../../api/noticeApi';

function NoticeModifyPage() {
  const { board_id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await noticeApi.getBoardDetail(board_id);
        setBoard({
          title: response.data.title,
          content: response.data.content
        });
      } catch (error) {
        console.error("Error:", error);
        alert("게시글을 불러오는데 실패했습니다.");
      }
    };
    fetchBoard();
  }, [board_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await noticeApi.updateBoard(board_id, board);
      alert("게시글이 수정되었습니다.");
      navigate(`/notice/board/${board_id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <div className="notice-modify">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={board.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            name="content"
            value={board.content}
            onChange={handleChange}
            rows="10"
          />
        </div>
        <div className="button-group">
          <button type="submit">수정하기</button>
          <button type="button" onClick={() => navigate(`/notice/board/${board_id}`)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeModifyPage; 