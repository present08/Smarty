import axios from "axios";

const BASE_URL = "http://localhost:8080/notice/board";

export const noticeApi = {
    // 게시글 작성
    writeNotice: async (noticeData) => {
        return await axios.post(`${BASE_URL}/user/write`, noticeData);
    },

    // 게시글 목록 조회
    getNoticeList: async () => {
        return await axios.get(`${BASE_URL}/user/nodeletelist`);
    },

    // 게시글 검색
    searchNotice: async (keyword, type) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/search`, {
                params: {
                    keyword: keyword,
                    type: type
                }
            });
            console.log('검색 응답:', response);  // 디버깅용
            return response;
        } catch (error) {
            console.error('검색 API 오류:', error);
            throw error;
        }
    },

    // 조회수 업데이트
    updateViewCount: async (boardId) => {
        return await axios.post(`${BASE_URL}/user/view/${boardId}`);
    },

    // 게시글 상세 조회
    getBoardDetail: async (boardId) => {
        return await axios.get(`${BASE_URL}/user/detail/${boardId}`);
    },

    modifyBoard: async (boardId, boardData) => {
        try {
            const response = await axios.put(`${BASE_URL}/user/modify/${boardId}`, boardData);
            console.log('수정 응답:', response);
            return response;
        } catch (error) {
            console.error('수정 API 오류:', error);
            throw error;
        }
    },

    // 게시글 삭제
    deleteBoard: async (boardId) => {
        return await axios.delete(`${BASE_URL}/user/delete/${boardId}`);
    },

    // 게시글 추천
    addGoodBtn: async (boardId) => {
        return await axios.post(`${BASE_URL}/user/view/good/${boardId}`);
    },

    // 게시글 비추천
    addBadBtn: async (boardId) => {
        return await axios.post(`${BASE_URL}/user/view/bad/${boardId}`);
    },

    deletedDate: async (boardId) => {
        return await axios.post(`${BASE_URL}/user/delete/${boardId}`);
    },

    // 댓글 관련 API
    comments: {
        // 댓글 목록 조회
        getComments: async (boardId) => {
            return await axios.get(`${BASE_URL}/comments/${boardId}`);
        },

        // 댓글 작성
        writeComment: async (commentData) => {
            return await axios.post(`${BASE_URL}/comments`, commentData);
        },

        // 답글 작성
        writeReply: async (replyData) => {
            return await axios.post(`${BASE_URL}/comments/reply`, replyData);
        }
    }
};