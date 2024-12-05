import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { noticeApi } from '../../api/noticeApi';
import "../../css/BoardDetail.css";
import axios from "axios";

function BoardDetail() {
  const { board_id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const user = localStorage.getItem('user');
  const userId = JSON.parse(user).userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardResponse = await noticeApi.getBoardDetail(board_id);
        setBoard(boardResponse.data);

        const commentsResponse = await noticeApi.comments.getComments(board_id);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error:", error);
        alert("데이터를 불러오는데 실패했습니다.");
      }
    };
    fetchData();
  }, [board_id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    if (!userId) {
      try {
        const sessionCheck = await noticeApi.checkSession();
        if (sessionCheck.userId) {
          localStorage.setItem('userId', sessionCheck.userId);
        } else {
          alert('로그인이 필요한 서비스 입니다.');
          navigate('/user/login');
          return;
        }
      } catch (error) {
        console.error('세션 확인 실패:', error);
        alert('로그인이 필요한 서비스 입니다.');
        navigate('/user/login');
        return;
      }
    }

    try {
      const commentData = {
        board_id: parseInt(board_id),
        content: newComment,
        user_id: userId
      };

      await noticeApi.comments.writeComment(commentData);

      const commentsResponse = await noticeApi.comments.getComments(board_id);
      setComments(commentsResponse.data);
      setNewComment('');
      console.log(commentData);
      alert('댓글이 작성되었습니다.');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleGoodBtn = async () => {
    try {
      await noticeApi.addGoodBtn(board_id);
      const response = await noticeApi.getBoardDetail(board_id);
      setBoard(response.data);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  const handleBadBtn = async () => {
    try {
      await noticeApi.addBadBtn(board_id);
      const response = await noticeApi.getBoardDetail(board_id);
      setBoard(response.data);
    } catch (error) {
      console.error("싫어요 처리 실패:", error);
      alert("싫어요 처리에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await noticeApi.deleteBoard(board_id);
        alert("게시글이 삭제되었습니다.");
        navigate("/notice/board");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleCommentEdit = async (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const handleCommentUpdate = async (reply_id) => {
    try {
      const commentData = {
        content: editedContent,
        reply_id: reply_id,
        board_id: board_id,
        user_id: userId
      };

      await noticeApi.comments.modifyComment(reply_id, commentData);
      alert('댓글이 수정되었습니다.');

      // 댓글 목록 새로고침
      const commentsResponse = await noticeApi.comments.getComments(board_id);
      setComments(commentsResponse.data);

      // 수정 모드 종료
      setEditingCommentId(null);
      setEditedContent('');
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleCommentDelete = async (reply_id) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        await noticeApi.comments.deleteCommnet(reply_id);
        const commentsResponse = await noticeApi.comments.getComments(board_id);
        setComments(commentsResponse.data);
        alert('댓글이 삭제되었습니다.');
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
        alert('댓글 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="board-detail">
      {board && (
        <>
          <div className="board-header">
            <h2>{board.title}</h2>
            <div className="board-info">
              <span>작성일: {new Date(board.send_date).toLocaleString()}</span>
              <span>조회수: {board.view_count}</span>
              <span>작성자: {board.user_id}</span>
            </div>
          </div>

          <div className="board-content">
            <p>{board.content}</p>
          </div>

          <div className="bdd-board-actions">
            <button onClick={handleGoodBtn}>
              👍 좋아요 {board.good_btn}
            </button>
            <button onClick={handleBadBtn}>
              👎 싫어요 {board.bad_btn}
            </button>
            <button onClick={() => navigate('/notice/board')}>
              목록
            </button>
            <button
              onClick={handleDelete}>
              삭제
            </button>
            <button
              onClick={() => navigate(`/notice/board/modify/${board_id}`)}>
              수정
            </button>
          </div>
        </>
      )}

      <div className="comments-section">
        <h3>댓글</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성해주세요"
            rows="3"
          />
          <button type="submit">댓글 작성</button>
        </form>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.reply_id} className="comment">
              {editingCommentId === comment.reply_id ? (
                <div className="comment-edit-form">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows="3"
                  />
                  <div className="comment-edit-buttons">
                    <button onClick={() => handleCommentUpdate(comment.reply_id)}>
                      저장
                    </button>
                    <button onClick={() => setEditingCommentId(null)}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="comment-content">{comment.content}</div>
                  <div className="comment-info">
                    <div className="comment-date">
                      {new Date(comment.send_date).toLocaleString()}
                    </div>
                    <span className="comment-author">작성자: {comment.user_id}</span>
                    {comment.user_id === userId && (
                      <div className="comment-actions">
                        <button onClick={() => handleCommentEdit(comment.reply_id, comment.content)}>
                          수정
                        </button>
                        <button onClick={() => handleCommentDelete(comment.reply_id)}>
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
