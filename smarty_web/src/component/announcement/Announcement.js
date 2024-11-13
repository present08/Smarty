import React, { useState } from 'react';
import '../../css/announcement.css';
import Footer from '../Footer';
import MainNav from '../MainNav';
import Wrapper from '../Wrapper';
import { Link } from 'react-router-dom';

const NoticeBoard = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notices, setNotices] = useState([
        {
            id: 1,
            type: '중요공지',
            title: '웨이잇 서버 점검 안내(7/21)',
            date: '2022-07-19',
            content: '서버 점검 관련 내용...'
        },
        {
            id: 2,
            type: '중요공지',
            title: '생활체육 신맴버 대면 공지입니다.',
            date: '2020-09-23',
            content: '신맴버 관련 내용...'
        },
        {
            id: 3,
            type: '중요공지',
            title: '스쿨웨이팅이 웨이잇으로 새롭게 탄생했습니다.',
            date: '2020-09-23',
            content: '서비스 리뉴얼 관련 내용...'
        },
        {
            id: 4,
            type: '중요공지',
            title: '서비스 임시 중단 안내 (9/23 목 09:00 - 20:00)',
            date: '2020-09-17',
            content: '서비스 중단 관련 내용...'
        },
    ]);
    const [newNotice, setNewNotice] = useState({
        type: '중요공지',
        title: '',
        content: ''
    });

    const [activeTab, setActiveTab] = useState('notice');
    const [activeFaq, setActiveFaq] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const noticesPerPage = 10;

    const faqs = [
        {
            id: 1,
            category: '회원가입',
            question: '회원가입은 어떻게 하나요?',
            answer: '홈페이지 우측 상단의 "회원가입" 버튼을 클릭하여 필요한 정보를 입력하시면 가입이 완료됩니다. 소셜 계정을 통한 간편 가입도 가능합니다.'
        },
        {
            id: 2,
            category: '결제',
            question: '결제 방법은 어떤 것이 있나요?',
            answer: '신용카드, 계좌이체, 휴대폰 결제, 카카오페이 등 다양한 결제 방법을 제공하고 있습니다. 각 결제 방법에 따른 자세한 절차는 결제 페이지에서 확인하실 수 있습니다.'
        },
        {
            id: 3,
            category: '서비스',
            question: '서비스 이용 시간은 어떻게 되나요?',
            answer: '기본적으로 24시간 365일 이용 가능합니다. 다만, 시스템 점검이 있는 경우 별도 공지를 통해 안내해 드립니다.'
        },
        {
            id: 4,
            category: '계정',
            question: '비밀번호를 잊어버렸어요.',
            answer: '로그인 페이지의 "비밀번호 찾기" 기능을 통해 가입 시 등록한 메일로 인증 후 비밀번호를 재설정하실 수 있습니다.'
        },
        {
            id: 5,
            category: '기타',
            question: '고객센터 운영 시간은 어떻게 되나요?',
            answer: '고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다. 주말 및 공휴일은 휴무이며, 긴급한 문의는 1:1 문의하기를 이용해 주시기 바랍니다.'
        }
    ];

    const toggleItem = (id) => {
        setActiveItem(activeItem === id ? null : id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNotice(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        const newNoticeItem = {
            id: notices.length + 1,
            ...newNotice,
            date: currentDate
        };

        setNotices(prev => [newNoticeItem, ...prev]);
        setIsModalOpen(false);
        setNewNotice({
            type: '중요공지',
            title: '',
            content: ''
        });
    };

    const toggleFaq = (id) => {
        setActiveFaq(activeFaq === id ? null : id);
    };



    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
    const totalPages = Math.ceil(notices.length / noticesPerPage);

    // 페이지 번호 배열 생성 함수
    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <>
            <MainNav />
            <Wrapper />
            <div className="container">
                {/* 헤더 섹션 */}
                <div className="header">
                    <h1 className="header-title">고객센터</h1>
                    <p className="header-subtitle">유세현 짱짱맨</p>
                </div>
                {/* 네비게이션 */}
                <div className="navigation">
                    <span
                        className={`nav-item ${activeTab === 'notice' ? 'active' : 'inactive'}`}
                        onClick={() => {
                            setActiveTab('notice');
                            toggleFaq(null);
                        }}
                    >
                        공지사항
                    </span>
                    <span
                        className={`nav-item ${activeTab === 'faq' ? 'active' : 'inactive'}`}
                        onClick={() => {
                            setActiveTab('faq');
                            toggleItem(null);
                        }}
                    >
                        자주하는 질문
                    </span>
                </div>

                {/* 컨텐츠 영역 */}
                {activeTab === 'notice' ? (
                    <>
                        <div className="notice-list">
                            {currentNotices.map((notice) => (
                                <div key={notice.id} className="notice-item">
                                    <div
                                        className="notice-header"
                                        onClick={() => toggleItem(notice.id)}
                                    >
                                        <div className="notice-info">
                                            <span className={`notice-type ${notice.type === '중요공지' ? 'important' : 'normal'}`}>
                                                {notice.type}
                                            </span>
                                            <span className="notice-title">{notice.title}</span>
                                        </div>
                                        <div className="notice-date-arrow">
                                            <span className="notice-date">{notice.date}</span>
                                            <span className={`arrow ${activeItem === notice.id ? 'active' : ''}`}>+</span>
                                        </div>
                                    </div>
                                    {activeItem === notice.id && (
                                        <div className="notice-content">
                                            {notice.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 페이지네이션 수정 */}
                        {notices.length > noticesPerPage && (
                            <div className="pagination">
                                <button
                                    className="page-button"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    이전
                                </button>

                                {getPageNumbers().map((number) => (
                                    <button
                                        key={number}
                                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(number)}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button
                                    className="page-button"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    다음
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    // FAQ 목록
                    <div className="notice-list">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="notice-item">
                                <div
                                    className="notice-header"
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="notice-info">
                                        <span className={`notice-type faq-category-${faq.category}`}>
                                            {faq.category}
                                        </span>
                                        <span className="notice-title">{faq.question}</span>
                                    </div>
                                    <span className={`arrow ${activeFaq === faq.id ? 'active' : ''}`}>
                                        +
                                    </span>
                                </div>
                                {activeFaq === faq.id && (
                                    <div className="notice-content">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 글쓰기 버튼 */}
                <button
                    className="write-button"
                    onClick={() => setIsModalOpen(true)}
                >
                    글쓰기
                </button>

                {/* 글쓰기 모달 */}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">공지 유형</label>
                                    <select
                                        name="type"
                                        value={newNotice.type}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    >
                                        <option value="중요공지">중요공지</option>
                                        <option value="일반공지">일반공지</option>
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
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        취소
                                    </button>
                                    <button type="submit" className="submit-button">
                                        등록
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* 
                푸터
                <footer className="footer">
                    <div className="footer-content">
                        <div>
                            <div className="footer-links">
                                <a href="#" className="footer-link">개인정보처리방침</a>
                                <a href="#" className="footer-link">저작권책</a>
                                <a href="#" className="footer-link">부서별 전화번호</a>
                                <a href="#" className="footer-link">영덕군 오시는 길</a>
                                <a href="#" className="footer-link">청사안내도</a>
                                <a href="#" className="footer-link">사이트맵</a>
                                <a href="#" className="footer-link">원격지원</a>
                            </div>
                            <div className="footer-info">
                                <p>경기 성남시 분당구 돌마로 46 5층 그린컴퓨터아카데미 성남분당점</p>
                                <p>대표전화: 010-2523-2625 &nbsp;&nbsp;&nbsp;팩스: 부서별안내&nbsp;&nbsp;&nbsp;이메일: aqs56874@gmail.com</p>
                                <p>© 미금 그린아카데미</p>
                            </div>
                        </div>
                        <div>
                            <img src="112.jpg" alt="하트" className="footer-logo" />
                        </div>
                    </div>
                </footer> */}
            </div>
            <Footer />
        </>
    );
};

export default NoticeBoard;