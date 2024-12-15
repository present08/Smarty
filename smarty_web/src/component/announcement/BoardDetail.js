import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { noticeApi } from '../../api/noticeApi';
import "../../css/BoardDetail.css";
import axiosInstance from '../../api/axiosInstance';

function BoardDetail() {
  const { board_id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const boardResponse = await noticeApi.getBoardDetail(board_id);
      setBoard(boardResponse.data);

      const commentsResponse = await noticeApi.comments.getComments(board_id);
      setComments(commentsResponse.data);
    };
    fetchData();
  }, [board_id]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        axiosInstance.get('/security/status')
          .then((response) => {
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);
            setIsLoggedIn(true);
            // 관리자 여부 확인
            if (user && user.level === 'admin') {
              console.log("관리자 권한이 있습니다.");
            } else {
              console.log("관리자 권한이 없습니다.");
            }
          })
          .catch((error) => {
            console.error('로그인 상태 확인 실패:', error);
            setIsLoggedIn(false);
            localStorage.removeItem('jwtToken'); // 토큰 제거
          });
      }
    };
    fetchUser();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem('user');
    console.log('저장된 사용자 정보:', user);

    if (!user) {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/user/login');
      return;
    }

    const userData = JSON.parse(user);
    console.log('파싱된 사용자 정보:', userData);


    console.log('사용자 ID 필드들:', {
      id: userData.id,
      userId: userData.userId,
      user_id: userData.user_id
    });

    const userId = userData.id || userData.userId || userData.user_id;
    if (!userId) {
      alert('사용자 정보가 올바르지 않습니다. 다시 로그인해주세요.');
      navigate('/user/login');
      return;
    }

    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
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
        user_id: JSON.parse(localStorage.getItem('user')).userId
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
        await noticeApi.comments.deleteComment(reply_id);
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
              <span>작일성일자: {new Date(board.send_date).toLocaleString()}</span>
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
            <>
              {(board.user_id === user.user_id || user.level === 'admin') && (
                <>
                  <button onClick={handleDelete}>
                    삭제
                  </button>
                  <button onClick={() => navigate(`/notice/board/modify/${board_id}`)}>
                    수정
                  </button>
                </>
              )}
            </>
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
                    <div className="comment-actions">
                      {(comment.user_id === user.user_id || user.level === 'admin') && (
                        <>
                          <button onClick={() => handleCommentEdit(comment.reply_id, comment.content)}>
                            수정
                          </button>
                          <button onClick={() => handleCommentDelete(comment.reply_id)}>
                            삭제
                          </button>
                        </>
                      )}
                    </div>
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
