import axios from "axios";
import axiosInstance from "./axiosInstance";
const BASE_URL = "http://localhost:8080";

export const noticeApi = {
    // 게시글 작성
    writeNotice: async (data) => {
        // const response = await axios.post(`${BASE_URL}/api/user/board/write`, data, {
        const response = await axiosInstance.post(`${BASE_URL}/api/user/board/write`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    },
    // 게시글 목록 조회
    getNoticeList: async () => {
        // const response = await axios.get(`${BASE_URL}/api/user/board/list`);
        const response = await axiosInstance.get(`${BASE_URL}/api/user/board/list`);
        return response.data;
    },

    // 게시글 검색
    searchNotice: async (keyword, type) => {
        // const response = await axios.get(`${BASE_URL}/api/user/board/search`, {
        const response = await axiosInstance.get(`${BASE_URL}/api/user/board/search`, {
            params: {
                keyword: keyword,
                type: type
            }
        });
        return response;
    },

    // 조회수 업데이트
    updateViewCount: async (boardId) => {
        // return await axios.post(`${BASE_URL}/api/user/board/view/${boardId}`);
        return await axiosInstance.post(`${BASE_URL}/api/user/board/view/${boardId}`);
    },

    // 게시글 상세 조회
    getBoardDetail: async (boardId) => {
        // return await axios.get(`${BASE_URL}/api/user/board/detail/${boardId}`);
        return await axiosInstance.get(`${BASE_URL}/api/user/board/detail/${boardId}`);
    },

    modifyBoard: async (boardId, boardData) => {
        // const response = await axios.put(`${BASE_URL}/api/user/board/modify/${boardId}`, boardData);
        const response = await axiosInstance.put(`${BASE_URL}/api/user/board/modify/${boardId}`, boardData);
        return response;
    },

    // 게시글 삭제
    deleteBoard: async (boardId) => {
        // return await axios.delete(`${BASE_URL}/api/user/board/delete/${boardId}`);
        return await axiosInstance.delete(`${BASE_URL}/api/user/board/delete/${boardId}`);
    },

    // 게시글 추천
    addGoodBtn: async (boardId) => {
        // return await axios.post(`${BASE_URL}/api/user/board/view/good/${boardId}`);
        return await axiosInstance.post(`${BASE_URL}/api/user/board/view/good/${boardId}`);
    },

    // 게시글 비추천
    addBadBtn: async (boardId) => {
        // return await axios.post(`${BASE_URL}/api/user/board/view/bad/${boardId}`);
        return await axiosInstance.post(`${BASE_URL}/api/user/board/view/bad/${boardId}`);
    },

    deletedDate: async (boardId) => {
        // return await axios.post(`${BASE_URL}/api/user/board/delete/${boardId}`);
        return await axiosInstance.post(`${BASE_URL}/api/user/board/delete/${boardId}`);
    },

    // 댓글 관련 API
    comments: {
        // 댓글 목록 조회
        getComments: async (boardId) => {
            // return await axios.get(`${BASE_URL}/api/user/comments/${boardId}`);
            return await axiosInstance.get(`${BASE_URL}/api/user/comments/${boardId}`);
        },

        // 댓글 작성
        writeComment: async (commentData) => {
            // return await axios.post(`${BASE_URL}/api/user/comments`, commentData);
            return await axiosInstance.post(`${BASE_URL}/api/user/comments`, commentData);
        },

        // 답글 작성
        writeReply: async (replyData) => {
            // return await axios.post(`${BASE_URL}/api/user/comments/reply`, replyData);
            return await axiosInstance.post(`${BASE_URL}/api/user/comments/reply`, replyData);
        },

        // 댓글 삭제
        deleteComment: async (commentId) => {
            // return await axios.delete(`${BASE_URL}/api/user/comments/delete/${commentId}`);
            return await axiosInstance.delete(`${BASE_URL}/api/user/comments/delete/${commentId}`);
        },

        // 댓글 수정
        modifyComment: async (reply_id, replyData) => {
            // return await axios.put(`${BASE_URL}/api/user/comments/modify/${reply_id}`, replyData);
            return await axiosInstance.put(`${BASE_URL}/api/user/comments/modify/${reply_id}`, replyData);
        }
    },

    // 수정된 updateBoard 함수
    updateBoard: (board_id, boardData) => {
        // return axios.put(`${BASE_URL}/api/user/board/modify/${board_id}`, boardData);
        return axiosInstance.put(`${BASE_URL}/api/user/board/modify/${board_id}`, boardData);
    },

    // 공지사항(announcement) 관련 API 추가
    announcement: {
        // 공지사항 목록 조회
        getNotices: async () => {
            // const response = await axios.get(`${BASE_URL}/api/user/announce/list`);
            const response = await axiosInstance.get(`${BASE_URL}/api/user/announce/list`);
            return response.data;
        },

        // 조회수 증가
        increaseViewCount: async (id) => {
            // const response = await axios.post(`${BASE_URL}/api/user/announce/view/${id}`);
            const response = await axiosInstance.post(`${BASE_URL}/api/user/announce/view/${id}`);
            return response.data;
        },

        // 공지사항 작성
        createNotice: async (noticeData) => {
            // const response = await axios.post(`${BASE_URL}/api/user/announce/write`, noticeData);
            const response = await axiosInstance.post(`${BASE_URL}/api/user/announce/write`, noticeData);
            return response.data;
        },

        // 공지사항 검색
        searchNotices: async (type, keyword) => {
            // const response = await axios.get(`${BASE_URL}/api/user/announce/search`, {
            const response = await axiosInstance.get(`${BASE_URL}/api/user/announce/search`, {
                params: { type, keyword }
            });
            return response.data;
        },

        // 공지사항 삭제
        deleteNotice: async (announce_id) => {
            // const response = await axios.delete(`${BASE_URL}/api/user/announce/delete/${announce_id}`, announce_id);
            const response = await axiosInstance.delete(`${BASE_URL}/api/user/announce/delete/${announce_id}`, announce_id);
            return response.data;
        },

        // 공지사항 수정
        // 여기서 announceData를 넣으니까 갑자기 오류 안남
        modifyNotice: async (announce_id, announceData) => {
            // const response = await axios.put(`${BASE_URL}/api/user/announce/modify/${announce_id}`, announceData);
            const response = await axiosInstance.put(`${BASE_URL}/api/user/announce/modify/${announce_id}`, announceData);
            return response.data;
        },

        // 공지사항 상세 조회
        getOneList: async (announce_id) => {
            // const response = await axios.get(`${BASE_URL}/api/user/announce/getOneList/${announce_id}`);
            const response = await axiosInstance.get(`${BASE_URL}/api/user/announce/getOneList/${announce_id}`);
            return response.data;
        },

        // 글쓰기 버튼 어드민한테만 보이기
        getCurrentUser: async (user_id) => {
            const response = await axiosInstance.get(`${BASE_URL}/api/user/announce/writeBtn`);
            return response.data;
        }
    },

    // 게시글 작성
    createNotice: async (noticeData) => {
        // const response = await axios.post(
        const response = await axiosInstance.post(
            `${BASE_URL}/api/user/board/write`,
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
        // await axios.post(`${BASE_URL}/api/user/board/view/${boardId}`);
        await axiosInstance.post(`${BASE_URL}/api/user/board/view/${boardId}`);
    },

    // 게시글 검색
    searchNotices: async (keyword, type) => {
        // const response = await axios.get(`${BASE_URL}/api/user/board/search`, {
        const response = await axiosInstance.get(`${BASE_URL}/api/user/board/search`, {
            params: { keyword, type }
        });
        return response.data;
    },

    // 세션 체크
    checkSession: async () => {
        // const response = await axios.get(`${BASE_URL}/api/auth/check-session`, {
        const response = await axiosInstance.get(`${BASE_URL}/api/auth/check-session`, {
            withCredentials: true
        });
        return response.data;
    },

    community: {
        getCommunity: async () => {
            // const response = await axios.get(`${BASE_URL}/api/user/notice/allList`);
            const response = await axiosInstance.get(`${BASE_URL}/api/user/notice/allList`);
            return response.data;
        }
    }
};