import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { noticeApi } from '../../api/noticeApi';
import '../../css/NoticeModifyPage.css';

function NoticeModifyPage() {
    const { board_id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentType, setContentType] = useState('');

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await noticeApi.getBoardDetail(board_id);
                setTitle(response.data.title);
                setContent(response.data.content);
                setContentType(response.data.content_type);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
                alert('게시글을 불러오는데 실패했습니다.');
            }
        };
        fetchBoard();
    }, [board_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        try {
            const response = await noticeApi.modifyBoard(board_id, {
                title,
                content,
                content_type: contentType
            });

            console.log('수정 요청 응답:', response); // 디버깅용

            if (response.status === 200) {
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/notice/board/detail/${board_id}`);
            }
        } catch (error) {
            console.error('수정 실패 상세:', error.response || error);
            alert(`게시글 수정에 실패했습니다: ${error.response?.data || '알 수 없는 오류가 발생했습니다.'}`);
        }
    };

    return (
        <div className="notice-modify-container">
            <h2>게시글 수정</h2>
            <form onSubmit={handleSubmit} className="modify-form">
                <div className="form-group">
                    <label>게시글 유형</label>
                    <select
                        value={content_type}
                        onChange={(e) => setContentType(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="NOTICE">공지사항</option>
                        <option value="EVENT">이벤트</option>
                        <option value="NEWS">뉴스</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows="10"
                    />
                </div>

                <div className="button-group">
                    <button type="submit">수정하기</button>
                    <button type="button" onClick={() => navigate(`/notice/board/detail/${board_id}`)}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoticeModifyPage;