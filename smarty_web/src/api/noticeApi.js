import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const noticeApi = {
    // 게시글 작성
    writeNotice: async (data) => {
        const response = await axios.post(`${BASE_URL}/notice/board/user/write`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    },
    // 게시글 목록 조회
    getNoticeList: async () => {
        const response = await axios.get(`${BASE_URL}/notice/board/user/list`);
        return response.data;
    },

    // 게시글 검색
    searchNotice: async (keyword, type) => {
        const response = await axios.get(`${BASE_URL}/notice/board/user/search`, {
            params: {
                keyword: keyword,
                type: type
            }
        });
        return response;
    },

    // 조회수 업데이트
    updateViewCount: async (boardId) => {
        return await axios.post(`${BASE_URL}/notice/board/user/view/${boardId}`);
    },

    // 게시글 상세 조회
    getBoardDetail: async (boardId) => {
        return await axios.get(`${BASE_URL}/notice/board/user/detail/${boardId}`);
    },

    modifyBoard: async (boardId, boardData) => {
        const response = await axios.put(`${BASE_URL}/notice/board/user/modify/${boardId}`, boardData);
        return response;
    },

    // 게시글 삭제
    deleteBoard: async (boardId) => {
        return await axios.delete(`${BASE_URL}/notice/board/user/delete/${boardId}`);
    },

    // 게시글 추천
    addGoodBtn: async (boardId) => {
        return await axios.post(`${BASE_URL}/notice/board/user/view/good/${boardId}`);
    },

    // 게시글 비추천
    addBadBtn: async (boardId) => {
        return await axios.post(`${BASE_URL}/notice/board/user/view/bad/${boardId}`);
    },

    deletedDate: async (boardId) => {
        return await axios.post(`${BASE_URL}/notice/board/user/delete/${boardId}`);
    },

    // 댓글 관련 API
    comments: {
        // 댓글 목록 조회
        getComments: async (boardId) => {
            return await axios.get(`${BASE_URL}/notice/board/comments/${boardId}`);
        },

        // 댓글 작성
        writeComment: async (commentData) => {
            return await axios.post(`${BASE_URL}/notice/board/comments`, commentData);
        },

        // 답글 작성
        writeReply: async (replyData) => {
            return await axios.post(`${BASE_URL}/notice/board/comments/reply`, replyData);
        },

        // 댓글 삭제
        deleteCommnet: async (commentId) => {
            return await axios.delete(`${BASE_URL}/notice/board/comments/delete/${commentId}`);
        }
    },

    // 수정된 updateBoard 함수
    updateBoard: (board_id, boardData) => {
        return axios.put(`${BASE_URL}/notice/board/user/modify/${board_id}`, boardData);
    },

    // 공지사항(announcement) 관련 API 추가
    announcement: {
        // 공지사항 목록 조회
        getNotices: async () => {
            const response = await axios.get(`${BASE_URL}/notice/announce/user/list`);
            return response.data;
        },

        // 조회수 증가
        increaseViewCount: async (id) => {
            const response = await axios.post(`${BASE_URL}/notice/announce/user/view/${id}`);
            return response.data;
        },

        // 공지사항 작성
        createNotice: async (noticeData) => {
            const response = await axios.post(`${BASE_URL}/notice/announce/user/write`, noticeData);
            return response.data;
        },

        // 공지사항 검색
        searchNotices: async (type, keyword) => {
            const response = await axios.get(`${BASE_URL}/notice/announce/user/search`, {
                params: { type, keyword }
            });
            return response.data;
        },

        // 공지사항 삭제
        deleteNotice: async (announce_id) => {
            const response = await axios.delete(`${BASE_URL}/notice/announce/user/delete/${announce_id}`, announce_id);
            return response.data;
        },

        // 공지사항 수정
        // 여기서 announceData를 넣으니까 갑자기 오류 안남
        modifyNotice: async (announce_id, announceData) => {
            const response = await axios.put(`${BASE_URL}/notice/announce/user/modify/${announce_id}`, announceData);
            return response.data;
        }
    },

    // 게시글 작성
    createNotice: async (noticeData) => {
        const response = await axios.post(
            `${BASE_URL}/notice/board/user/write`,
            noticeData,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return response.data;
    },

    // 조회수 증가
    incrementViewCount: async (boardId) => {
        await axios.post(`${BASE_URL}/notice/board/user/view/${boardId}`);
    },

    // 게시글 검색
    searchNotices: async (keyword, type) => {
        const response = await axios.get(`${BASE_URL}/notice/board/user/search`, {
            params: { keyword, type }
        });
        return response.data;
    },

    // 세션 체크
    checkSession: async () => {
        const response = await axios.get(`${BASE_URL}/api/check-session`, {
            withCredentials: true
        });
        return response.data;
    },

    community: {
        getCommunity: async () => {
            const response = await axios.get(`${BASE_URL}/notice/allList`);
            return response.data;
        }
    }
};