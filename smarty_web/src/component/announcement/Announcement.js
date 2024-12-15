import React, { useState, useEffect } from 'react';
import '../../css/announcement.css';
import axiosInstance from '../../api/axiosInstance';
import MainNav from '../MainNav';
import Wrapper from '../Wrapper';
import BackToTopButton from '../BackToTopButton';
import Footer from '../Footer';
import { noticeApi } from '../../api/noticeApi';
import { useNavigate, useParams } from 'react-router-dom';

const NoticeBoard = () => {
    const { announce_id } = useParams();
    const navigate = useNavigate();
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
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 초기 로딩 시 백엔드에서 공지사항 데이터를 가져오는 함수
    useEffect(() => {
        const fetchNotices = async () => {
            const data = await noticeApi.announcement.getNotices();
            setNotices(data);
        };
        fetchNotices();
    }, []);

    // 사용자 정보를 가져오는 useEffect
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

    const toggleItem = async (id) => {
        if (activeItem !== id) {
            await noticeApi.announcement.increaseViewCount(id);
            setNotices(notices.map(notice =>
                notice.announce_id === id
                    ? { ...notice, view_count: notice.view_count + 1 }
                    : notice
            ));
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
            const data = await noticeApi.announcement.createNotice(newNoticeItem);
            if (data) {
                setNotices(prev => [data, ...prev]);
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
            const data = await noticeApi.announcement.searchNotices(searchType, keyword);
            setNotices(data);
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다:', error);
        }
    };

    const handleDeleteNotice = async (announce_id) => {

        if (window.confirm('공지사항을 삭제하시겠습니까?')) {
            const data = await noticeApi.announcement.deleteNotice(announce_id);
            setNotices(notices.filter(notice => notice.announce_id !== announce_id));
        } else {
            return;
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
            <div className="ann-notice-board">
                <div className="ann-header">
                    <div className="ann-header-content">
                        <h1 className="ann-header-title">공지사항</h1>
                        <p className="ann-header-subtitle">공지사항을 확인해주세요</p>
                    </div>
                </div>

                <div className="ann-content-wrapper">
                    {/* 검색창과 글쓰기 버튼을 포함하는 상단 섹션 */}
                    <div className="ann-top-section">
                        <div className="ann-search-container">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                className="ann-search-input"
                            />
                            <button onClick={handleSearch} className="ann-search-button">
                                검색
                            </button>
                        </div>

                        {/* 글쓰기 버튼을 별도로 분리 */}

                        <div className="write-button-container">
                            {isLoggedIn && user?.level === 'admin' && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="ann-write-button"
                                >
                                    글쓰기
                                </button>
                            )}
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
                                        <div className="announcement-content">
                                            <div className="content-text">
                                                {notice.content}
                                            </div>
                                            <div className="notice-actions" style={{ marginTop: '20px', textAlign: 'right' }}>
                                                {user && user.level === 'admin' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleDeleteNotice(notice.announce_id)}
                                                            className="ann-delete-button"
                                                            style={{ marginRight: '10px' }}
                                                        >
                                                            삭제
                                                        </button>
                                                        <button
                                                            className="ann-notice-modify"
                                                            onClick={() => navigate(`/notice/announce/modify/${notice.announce_id}`)}
                                                        >
                                                            수정
                                                        </button>
                                                    </>
                                                )}
                                            </div>
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
                    <div className="ann-modal">
                        <div className="ann-modal-content">
                            <div className="ann-modal-header">
                                <h2 className="ann-modal-title">공지사항 작성</h2>
                                <button
                                    className="ann-modal-close-button"
                                    onClick={handleCloseModal}
                                >
                                    ×
                                </button>
                            </div>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="ann-form-group">
                                    <label className="ann-form-label">공지유형</label>
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

                                <div className="ann-form-group">
                                    <label className="ann-form-label">제목</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newNotice.title}
                                        onChange={handleInputChange}
                                        className="ann-form-input"
                                        required
                                    />
                                </div>

                                <div className="ann-form-group">
                                    <label className="ann-form-label">내용</label>
                                    <textarea
                                        name="content"
                                        value={newNotice.content}
                                        onChange={handleInputChange}
                                        className="ann-form-textarea"
                                        required
                                    />
                                </div>

                                <div className="form-buttons">
                                    <button type="submit" className="ann-submit-button">
                                        등록
                                    </button>
                                    <button
                                        type="button"
                                        className="ann-cancel-button"
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
