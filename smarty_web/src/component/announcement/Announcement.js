import React, { useState, useEffect } from 'react';
import '../../css/announcement.css';
import axios from 'axios';
import MainNav from '../MainNav';
import Wrapper from '../Wrapper';
import BackToTopButton from '../BackToTopButton';
import Footer from '../Footer';

const NoticeBoard = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notices, setNotices] = useState([]);
    const [searchType, setSearchType] = useState('all');
    const [keyword, setKeyword] = useState('');
    const [newNotice, setNewNotice] = useState({
        title: '',
        content: '',
        isImportant: 1,
        view_count: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const noticesPerPage = 8;

    // 초기 로딩 시 백엔드에서 공지사항 데이터를 가져오는 함수
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('http://localhost:8080/notice/announce/user/list');
                setNotices(response.data); // 가져온 데이터를 notices 상태에 업데이트
            } catch (error) {
                console.error('공지사항을 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchNotices();
    }, []); // 빈 배열로 설정하여 컴포넌트가 처음 더링될 때만 호출

    const toggleItem = async (id) => {
        if (activeItem !== id) {  // 새로운 항목을 열 때만 조회수 증가
            try {
                console.log('조회수 증가 API 호출:', id);
                const response = await axios.post(`http://localhost:8080/notice/announce/user/view/${id}`);
                console.log('API 응답:', response.data);

                // 로컬 상태 업데이트
                setNotices(notices.map(notice =>
                    notice.announce_id === id
                        ? { ...notice, view_count: notice.view_count + 1 }
                        : notice
                ));
            } catch (error) {
                console.error('조회수 업데이트 중 오류 상세:', error.response || error);
            }
        }
        setActiveItem(activeItem === id ? null : id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNotice(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().replace('Z', '');
        const newNoticeItem = {
            ...newNotice,
            send_date: currentDate,
            isImportant: newNotice.isImportant
        };

        try {
            const response = await axios.post('http://localhost:8080/notice/announce/user/write', newNoticeItem);
            if (response.data) {
                setNotices(prev => [response.data, ...prev]);
                setNewNotice({
                    title: '',
                    content: '',
                    isImportant: 1,
                    view_count: 0
                });
                alert('공지사항이 등록되었습니다.');
            }
        } catch (error) {
            console.error('공지사항 작성 실패:', error);
            alert('공지사항 등록에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/notice/announce/user/search`, {
                params: { type: searchType, keyword: keyword }
            });
            setNotices(response.data);
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다:', error);
        }
    };


    // 전체 페이지 수 계산
    const totalPages = Math.ceil(notices.length / noticesPerPage);

    // 현재 페이지에 표시할 공지사항들
    const getCurrentPageNotices = () => {
        const sortedNotices = notices.sort((a, b) => {
            if (a.isImportant !== b.isImportant) {
                return b.isImportant - a.isImportant;
            }
            return new Date(b.send_date) - new Date(a.send_date);
        });

        const startIndex = (currentPage - 1) * noticesPerPage;
        return sortedNotices.slice(startIndex, startIndex + noticesPerPage);
    };

    // 모달 닫기 처리를 위한 새로운 함수
    const handleCloseModal = () => {
        // 제목이나 내용이 있는 경우에만 확인 창 표시
        if (newNotice.title.trim() || newNotice.content.trim()) {
            if (window.confirm('작성 중인 내용은 저장되 않습니다. 그래도 종료하시겠습니까?')) {
                setIsModalOpen(false);
                // 모달 폼 초기화
                setNewNotice({
                    title: '',
                    content: '',
                    isImportant: 1,
                    view_count: 0
                });
            }
        } else {
            setIsModalOpen(false);
        }
    };



    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <div className="notice-board">
                <div className="header">
                    <h1 className="header-title">공지사항</h1>
                    <p className="header-subtitle">SMARTY의 새로운 소식을 확인하세요</p>
                </div>

                <div className="content-wrapper">
                    {/* 검색창과 글쓰기 버튼을 포함하는 상단 섹션 */}
                    <div className="top-section">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="search-input"
                            />
                            <button onClick={handleSearch} className="search-button">
                                검색
                            </button>
                        </div>

                        {/* 글쓰기 버튼을 별도로 분리 */}
                        <div className="write-button-container">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="write-button"
                            >
                                글쓰기
                            </button>
                        </div>
                    </div>

                    {/* 컬럼 헤더 추가 */}
                    <div className="notice-header-columns">
                        <div className="column type">공지유형</div>
                        <div className="column title">제목</div>
                        <div className="column date">작성일</div>
                        <div className="column views">조회수</div>
                    </div>

                    <div className="notice-list">
                        {getCurrentPageNotices().map((notice) => {
                            const isNew = new Date() - new Date(notice.send_date) < 24 * 60 * 60 * 1000;
                            return (
                                <div key={notice.announce_id} className="notice-item">
                                    <div className="notice-header" onClick={() => toggleItem(notice.announce_id)}>
                                        <div className="notice-header-left">
                                            <span className={`notice-type ${notice.isImportant ? 'important' : 'normal'}`}>
                                                {notice.isImportant ? '중요공지' : '일반공지'}
                                            </span>
                                            <span className="notice-title">
                                                {notice.title}
                                                {isNew && <span className="new-badge">New</span>}
                                            </span>
                                        </div>
                                        <div className="notice-info">
                                            <span className="notice-date">
                                                {new Date(notice.send_date).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false
                                                })}
                                            </span>
                                            <span className="notice-views">
                                                {notice.view_count}
                                            </span>
                                        </div>
                                    </div>
                                    {activeItem === notice.announce_id && (
                                        <div
                                            className="announcement-content"
                                            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                                        >
                                            {notice.content}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* 페이지네이션 컨트롤 추가 */}
                    <div className="pagination">
                        <button
                            className="pagination-button"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            이전
                        </button>

                        <div className="pagination-numbers">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                <button
                                    key={pageNum}
                                    className={`pagination-number ${pageNum === currentPage ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        <button
                            className="pagination-button"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            다음
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">공지사항 작성</h2>
                                <button
                                    className="modal-close-button"
                                    onClick={handleCloseModal}
                                >
                                    ×
                                </button>
                            </div>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">공지 유형</label>
                                    <select
                                        name="isImportant"
                                        value={newNotice.isImportant}
                                        onChange={handleInputChange}
                                        className="form-select"
                                    >
                                        <option value="1">중요공지</option>
                                        <option value="0">일반공지</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">제목</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newNotice.title}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">내용</label>
                                    <textarea
                                        name="content"
                                        value={newNotice.content}
                                        onChange={handleInputChange}
                                        className="form-textarea"
                                        required
                                    />
                                </div>

                                <div className="form-buttons">
                                    <button type="submit" className="submit-button">
                                        등록
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={handleCloseModal}
                                    >
                                        취소
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default NoticeBoard;
