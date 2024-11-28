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
    const [announcements, setAnnouncements] = useState({
        title: '',
        content: '',
        send_date: '',
        content_type: '',
        view_count: 0,
        good_btn: 0,
        bad_btn: 0
    });

    const [isModalState, setIsModalState] = useState(false);

    // 페이지네이션을 위한 상태 추가
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // 검색을 위한 상태 추가
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchType, setSearchType] = useState('all');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // 현재 페이지의 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = boards.slice(indexOfFirstPost, indexOfLastPost);

    // 전체 페이지 수 계산
    const pageNumbers = Math.ceil(boards.length / postsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncements(prev => ({
            ...prev,
            [name]: value // 여기서 []는 배열이 아닌 컴퓨티드 프로퍼티 이름이라는 문법
        }));
    }

    const handleModalState = () => {
        if (announcements.title?.trim() || announcements.content?.trim()) {
            if (window.confirm('작성 중인 내용은 저장되지 않습니다. 그래도 종료 하시겠습니까?')) {
                setIsModalState(false);
                setAnnouncements({
                    title: '',
                    content: '',
                    content_type: '',
                });
            }
        } else {
            setIsModalState(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).userId;

        if (!userId) {
            try {
                const sessionCheck = await noticeApi.checkSession();
                if (sessionCheck.userId) {
                    localStorage.setItem('userId', sessionCheck.userId);
                } else {
                    alert('로그인이 필요한 서비스입니다.');
                    return;
                }
            } catch (error) {
                console.error('세션 확인 실패:', error);
                alert('로그인이 필요한 서비스입니다.');
                return;
            }
        }

        if (!announcements.title.trim() || !announcements.content.trim() || !announcements.content_type) {
            alert('제목, 내용, 카테고리를 모두 입력해주세요.');
            return;
        }

        const newNoticeItem = {
            title: announcements.title.trim(),
            content: announcements.content.trim(),
            content_type: announcements.content_type,
            user_id: userId,
            view_count: 0,
            good_btn: 0,
            bad_btn: 0,
            is_deleted: 0
        };

        try {
            const response = await noticeApi.createNotice(newNoticeItem);
            if (response >= 0) {
                const updatedBoards = await noticeApi.getNoticeList();
                setBoards(updatedBoards);
                setAnnouncements({
                    title: '',
                    content: '',
                    content_type: '',
                    view_count: 0,
                    good_btn: 0,
                    bad_btn: 0
                });
                alert('게시글이 등록되었습니다.');
                setIsModalState(false);
            }
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
        }
    }

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const data = await noticeApi.getNoticeList();
                setBoards(data);
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

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchKeyword.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        setIsSearching(true);
        try {
            const searchData = await noticeApi.searchNotices(searchKeyword, searchType);
            if (searchData.length === 0) {
                alert('검색 결과가 없습니다.');
            }
            setBoards(searchData);
            setCurrentPage(1);
        } catch (error) {
            console.error('검색 실패:', error);
            alert('검색 중 오류가 발생했습니다.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleResetSearch = async () => {
        setSearchKeyword('');
        setSearchType('all');
        setIsSearching(false);
        try {
            const data = await noticeApi.getNoticeList();
            setBoards(data);
            setCurrentPage(1);
        } catch (error) {
            console.error('게시글 목록 불러오기 실패:', error);
        }
    };

    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <div className="notice-board" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px'
            }}>
                <div className="header" style={{
                    backgroundColor: '#f8f9fa',
                    padding: '40px 0',
                    textAlign: 'center',
                    borderRadius: '10px',
                    marginBottom: '30px'
                }}>
                    <div className="header-content">
                        <h1 className="header-title" style={{
                            fontSize: '2.5rem',
                            color: '#333',
                            marginBottom: '10px'
                        }}>커뮤니티</h1>
                        <p className="header-subtitle" style={{
                            fontSize: '1.1rem',
                            color: '#666'
                        }}>회원들과 자유롭게 소통해보세요</p>
                    </div>
                </div>

                <div className="container">
                    {/* 검색 폼 추가 */}
                    <form onSubmit={handleSearch} style={{
                        marginBottom: '20px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '8px'
                    }}>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                minWidth: '120px'
                            }}
                        >
                            <option value="all">전체</option>
                            <option value="user_id">아이디</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                        </select>

                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="검색어를 입력하세요"
                            style={{
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                flex: 1
                            }}
                        />

                        <button
                            type="submit"
                            disabled={isSearching}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                minWidth: '80px'
                            }}
                        >
                            {isSearching ? '검색 중...' : '검색'}
                        </button>

                        <button
                            type="button"
                            onClick={handleResetSearch}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            초기화
                        </button>
                    </form>

                    {/* 검색 결과가 없을 때 메시지 표시 */}
                    {boards.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '20px',
                            color: '#666'
                        }}>
                            검색 결과가 없습니다.
                        </div>
                    )}

                    <div className="button-container" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <h2 className="page-title" style={{
                            fontSize: '1.5rem',
                            color: '#333'
                        }}>전체 게시글</h2>
                        <button
                            className="write-button"
                            onClick={() => setIsModalState(true)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            글쓰기
                        </button>
                    </div>

                    <div className="table-container" style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <table className="table" style={{
                            width: '100%',
                            borderCollapse: 'collapse'
                        }}>
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
                                {currentPosts.map((item, index) => (
                                    <tr
                                        key={item.board_id}
                                        className="table-row"
                                        onClick={() => toggleItem(item.board_id)}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                            ':hover': {
                                                backgroundColor: '#f8f9fa'
                                            }
                                        }}
                                    >
                                        <td className="td">{boards.length - ((currentPage - 1) * postsPerPage + index)}</td>
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

                        {/* 페이지네이션 UI 추가 */}
                        <div className="pagination" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '10px',
                            margin: '20px 0'
                        }}>
                            {/* 이전 페이지 버튼 */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '5px 10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    backgroundColor: currentPage === 1 ? '#f8f9fa' : 'white',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                이전
                            </button>

                            {/* 페이지 번호 버튼들 */}
                            {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(number => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    style={{
                                        padding: '5px 10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        backgroundColor: currentPage === number ? '#007bff' : 'white',
                                        color: currentPage === number ? 'white' : 'black',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {number}
                                </button>
                            ))}

                            {/* 다음 페이지 버튼 */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === pageNumbers}
                                style={{
                                    padding: '5px 10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    backgroundColor: currentPage === pageNumbers ? '#f8f9fa' : 'white',
                                    cursor: currentPage === pageNumbers ? 'not-allowed' : 'pointer'
                                }}
                            >
                                다음
                            </button>
                        </div>

                        {isModalState && (
                            <div className='modal' style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000
                            }}>
                                <div className='modal-content' style={{
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    width: '90%',
                                    maxWidth: '600px'
                                }}>
                                    <div className='modal-header'>
                                        <h2 className='modal-title'>게시글 작성</h2>
                                        <button className='modal-close-button' onClick={handleModalState}>
                                            ×
                                        </button>
                                    </div>
                                    <form className='form' onSubmit={handleSubmit} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px'
                                    }}>
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
                                                <option value="가입인사">가입인사</option>
                                                <option value="질문">질문</option>
                                                <option value="수다">수다</option>
                                            </select>
                                        </div>
                                        <div className="form-buttons" style={{
                                            display: 'flex',
                                            gap: '10px',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <button type="submit" className="submit-button" style={{
                                                padding: '10px 20px',
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}>
                                                등록
                                            </button>
                                            <button
                                                type="button"
                                                className="cancel-button"
                                                onClick={handleModalState}
                                                style={{
                                                    padding: '10px 20px',
                                                    backgroundColor: '#6c757d',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}>
                                                취소
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Announcement;
