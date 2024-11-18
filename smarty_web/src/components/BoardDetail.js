import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BoardDetail() {
    const { board_id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인한 사용자 ID

    useEffect(() => {
        // 게시글 정보 불러오기
        const fetchBoard = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/notice/board/user/detail/${board_id}`);
                setBoard(response.data);
            } catch (error) {
                console.error("게시글 로드 실패:", error);
                alert("게시글 정보를 불러오지 못했습니다.");
                navigate("/notice/board");
            }
        };

        // 현재 사용자 ID 가져오기
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get("http://localhost:8080/current-user");
                setCurrentUserId(response.data.user_id);
            } catch (error) {
                console.error("현재 사용자 정보 로드 실패:", error);
            }
        };

        fetchBoard();
        fetchCurrentUser();
    }, [board_id, navigate]);

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:8080/notice/board/user/delete/${board_id}`);
                alert("게시글이 삭제되었습니다.");
                navigate("/notice/board");
            } catch (error) {
                console.error("게시글 삭제 실패:", error);
                alert("게시글 삭제에 실패했습니다.");
            }
        }
    };

    const handleEdit = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:8080/notice/board/user/update/${id}`, updatedData);
            if (response.data) {
                alert("게시글이 수정되었습니다.");
                const updatedBoardResponse = await axios.get(`http://localhost:8080/notice/board/user/detail/${id}`);
                setBoard(updatedBoardResponse.data);
            }
        } catch (error) {
            console.error("게시글 수정 실패:", error);
            alert("게시글 수정에 실패했습니다.");
        }
    };


    if (!board) return <p>Loading...</p>;

    return (
        <div className="board-detail-container">
            <div className="board-detail-content">
                <h1 className="board-title">{board.title}</h1>
                <div className="board-info">
                    <span>작성자: {board.user_id}</span>
                    <span>작성일: {board.send_date}</span>
                    <span>조회수: {board.view_count}</span>
                </div>
                <div className="board-content">{board.content}</div>

                {currentUserId === board.user_id && (
                    <div className="button-group">
                        <button className="edit-button" onClick={handleEdit}>수정</button>
                        <button className="delete-button" onClick={handleDelete}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoardDetail;
