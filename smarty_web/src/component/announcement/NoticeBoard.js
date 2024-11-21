import React, { useEffect, useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import '../../css/noticeBoard.css';
import axios from 'axios';
import MainNav from '../MainNav';
import Wrapper from '../Wrapper';
import BackToTopButton from '../BackToTopButton';
import Footer from '../Footer';
import { noticeApi } from '../../api/noticeApi';

function Announcement() {
    const navigate = useNavigate();

    const [boards, setBoards] = useState([])
    const [keyword, setKeyword] = useState('')
    const [searchType, setSearchType] = useState('title')
    const [announcements, setAnnouncements] = useState({
        title: '',
        content: '',
        send_date: '',
        content_type: '',
        view_count: 0,
        good_btn: 0,
        bad_btn: 0,
        user_id: 'test_user'
    });

    const [isModalState, setIsModalState] = useState(false);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await noticeApi.getNoticeList();
                setBoards(response.data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            }
        };
        fetchNotices();
    }, []);

    const toggleItem = async (board_id) => {
        try {
            await noticeApi.updateViewCount(board_id);
            navigate(`/notice/board/${board_id}`)
        } catch (error) {
            console.error('조회수 업데이트 실패:', error);
        }
    }

    const handleSearch = async () => {
        if (!keyword.trim()) {
            alert('검색어를 입력해주세요');
            return;
        }
        try {
            console.log('검색 요청 파라미터:', { keyword, searchType });
            const response = await noticeApi.searchNotice(keyword, searchType);
            console.log('검색 응답 데이터:', response.data);

            if (response.data) {
                setBoards(response.data);
                if (response.data.length === 0) {
                    alert('검색 결과가 없습니다.');
                }
            }
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다:', error);
            alert('검색 중 오류가 발생했습니다.');
        }
    }

    const handleModalState = () => {
        setIsModalState(!isModalState);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncements(prev => ({
            ...prev,
            [name]: value // 여기서 []는 배열이 아닌 컴퓨티드 프로퍼티 이름이라는 문법
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 데이터 유효성 검사
        if (!announcements.title.trim() || !announcements.content.trim() || !announcements.content_type) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        try {
            // BoardDTO와 정확히 일치하는 데이터 구조
            const submitData = {
                title: announcements.title.trim(),
                content: announcements.content.trim(),
                content_type: announcements.content_type,
                user_id: 'test_user',  // 실제 로그인한 사용자 ID로 변경 필요
                view_count: 0,
                good_btn: 0,
                bad_btn: 0,
                is_deleted: 0,
                board_id: null,  // 새 게시글이므로 null
                send_date: null  // 서버에서 설정됨
            };

            // 디버깅을 위한 로그
            console.log('서버로 전송되는 데이터:', submitData);

            const response = await noticeApi.writeNotice(submitData);
            
            if (response.data) {
                const updatedResponse = await noticeApi.getNoticeList();
                setBoards(updatedResponse.data);
                // 폼 초기화
                setAnnouncements({
                    title: '',
                    content: '',
                    content_type: '',
                    user_id: 'test_user',
                    view_count: 0,
                    good_btn: 0,
                    bad_btn: 0
                });
                alert('게시글이 등록되었습니다.');
                setIsModalState(false);
            }
        } catch (error) {
            // 더 자세한 에러 정보 출력
            console.error('게시글 등록 에러:', error);
            console.error('에러 응답:', error.response);
            console.error('에러 데이터:', error.response?.data);
            alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <link rel="stylesheet" href="../../css/noticeBoard.css" />
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <div className="nb-notice-board">
                <div className="nb-header">
                    <h1 className="nb-header-title">자유게시판</h1>
                    <p className="nb-header-subtitle">회원들과 자유롭게 소통해보세요</p>
                </div>

                <div className="container">
                    <div className="button-container">
                        <h2 className="page-title">전체 게시글</h2>
                        <button
                            className="write-button"
                            onClick={handleModalState}
                        >
                            <i className="fas fa-pen"></i> 글쓰기
                        </button>
                    </div>
                    <div className='nb-search-container'>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value='title'>제목</option>
                            <option value='content'>내용</option>
                        </select>
                        <input
                            type='text'
                            placeholder='검색어를 입력하세요'
                            className='nb-search-input'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        >
                        </input>
                        <button className='nb-search-button'
                            onClick={handleSearch}
                        >
                            검색
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="th" style={{ width: '8%' }}>번호</th>
                                    <th className="th" style={{ width: '15%' }}>카테고리</th>
                                    <th className="th" style={{ width: '45%' }}>제목</th>
                                    <th className="th" style={{ width: '15%' }}>작성자</th>
                                    <th className="th" style={{ width: '17%' }}>작성일</th>
                                    <th className="th" style={{ width: '15%' }}>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.map((item, index) => (
                                    <tr
                                        key={item.board_id}
                                        className="table-row"
                                        onClick={() => toggleItem(item.board_id)}
                                    >
                                        <td className="td">{boards.length - index}</td>
                                        <td className="td">{item.content_type}</td>
                                        <td className="td title">{item.title}</td>
                                        <td className="td author">{item.user_id}</td>
                                        <td className="td">{item.send_date
                                            .replace('T', ' ')
                                            .substring(5, 16)}</td>
                                        <td className="td">{item.view_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {isModalState && (
                        <div className='modal'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h2 className='modal-title'>게시글 작성</h2>
                                    <button className='modal-close-button' onClick={handleModalState}>
                                        ×
                                    </button>
                                </div>
                                <form className='form' onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label className='form-label'>제목</label>
                                        <input type='text' name='title'
                                            value={announcements.title}
                                            onChange={handleInputChange}
                                            className='form-input'
                                            required />
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>내용</label>
                                        <textarea name='content'
                                            value={announcements.content}
                                            onChange={handleInputChange}
                                            className='form-textarea'
                                            required />
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>카테고리</label>
                                        <select name='content_type'
                                            value={announcements.content_type}
                                            onChange={handleInputChange}
                                            className='form-select'
                                            required>
                                            <option value="">카테고리 선택</option>
                                            <option value="일반">일반</option>
                                            <option value="질문">질문</option>
                                            <option value="수다">수다</option>
                                        </select>
                                    </div>
                                    <div className="form-buttons">
                                        <button type="submit" className="submit-button">
                                            등록
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-button"
                                            onClick={handleModalState}>
                                            취소
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Announcement;
