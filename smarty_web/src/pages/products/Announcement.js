import React, { useState } from 'react';

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

    const [askedQuestion, setAskedQuestion] = useState({
        type: ''
    })
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

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            background: `linear-gradient(rgba(25, 94, 142, 0.9), rgba(25, 94, 142, 0.7)), url("/header-bg.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 40px',
            color: 'white',
        },
        headerTitle: {
            fontSize: '32px',
            marginBottom: '10px',
        },
        headerSubtitle: {
            fontSize: '16px',
            opacity: '0.9',
        },
        navigation: {
            borderBottom: '1px solid #ddd',
            margin: '20px 40px',
            paddingBottom: '10px',
            display: 'flex',
            gap: '20px',
        },
        navItem: {
            padding: '10px 0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
        },
        activeNavItem: {
            color: '#195E8E',
            fontWeight: 'bold',
            borderBottom: '2px solid #195E8E',
        },
        inactiveNavItem: {
            color: '#666',
            '&:hover': {
                color: '#FFC342',
            }
        },
        noticeList: {
            padding: '0 40px',
        },
        noticeItem: {
            borderBottom: '1px solid #eee',
            marginBottom: '2px',
        },
        noticeHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            cursor: 'pointer',
        },
        noticeInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
        },
        noticeType: {
            padding: '4px 12px',
            borderRadius: '15px',
            fontSize: '14px',
            color: 'white',
            minWidth: '80px',
            textAlign: 'center',
        },
        importantNotice: {
            backgroundColor: '#195E8E',
        },
        normalNotice: {
            backgroundColor: '#50C4D2',
        },
        noticeTitle: {
            color: '#333',
            flex: 1,
        },
        noticeDate: {
            color: '#888',
            fontSize: '14px',
        },
        arrow: {
            fontSize: '20px',
            transition: 'transform 0.3s ease',
        },
        arrowActive: {
            transform: 'rotate(45deg)',
        },
        noticeContent: {
            padding: '15px',
            backgroundColor: '#EFF2FB',
            marginBottom: '2px',
            borderRadius: '8px',
        },
        writeButton: {
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            backgroundColor: '#195E8E',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            fontSize: '16px',
            zIndex: 100,
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#FFC342',
            }
        },
        modal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        label: {
            fontWeight: 'bold',
        },
        input: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            '&:focus': {
                borderColor: '#195E8E',
                outline: 'none',
            }
        },
        textarea: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            minHeight: '200px',
            resize: 'vertical',
        },
        buttonGroup: {
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            marginTop: '20px',
        },
        submitButton: {
            padding: '10px 20px',
            backgroundColor: '#195E8E',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#FFC342',
            }
        },
        cancelButton: {
            padding: '10px 20px',
            backgroundColor: '#195E8E',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#FFC342',
            }
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            padding: '20px 0',
        },
        pageButton: {
            padding: '8px 15px',
            backgroundColor: '#195E8E',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#FFC342',
            }
        },
        pageNumberButton: {
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            color: '#333',
            cursor: 'pointer',
            borderRadius: '4px',
            minWidth: '35px',
            textAlign: 'center',
        },
        activePageButton: {
            backgroundColor: '#195E8E',
            color: 'white',
            border: '1px solid #195E8E',
        },
        footer: {
            width: '100%',
            borderTop: '1px solid #ddd',
            backgroundColor: '#f8f8f8',
            marginTop: 'auto',
            position: 'sticky',
            bottom: 0,
        },
        footerContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        footerLeft: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '15px',
        },
        footerLink: {
            color: '#333',
            textDecoration: 'none',
            fontSize: '13px',
            '&:hover': {
                textDecoration: 'underline',
            }
        },
        footerInfo: {
            color: '#666',
            fontSize: '12px',
            lineHeight: '1.5',
        },
        footerLogo: {
            width: '100px',
            height: 'auto',
        },
        faqCategory: {
            회원가입: {
                backgroundColor: '#BDBDBD',
            },
            결제: {
                backgroundColor: '#BDBDBD',
            },
            서비스: {
                backgroundColor: '#BDBDBD',
            },
            계정: {
                backgroundColor: '#BDBDBD',
            },
            기타: {
                backgroundColor: '#BDBDBD',
            },
        },
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
        <div style={styles.container}>
            {/* 헤더 섹션 */}
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>고객센터</h1>
                <p style={styles.headerSubtitle}>유세현 짱짱맨</p>
            </div>

            {/* 네비게이션 */}
            <div style={styles.navigation}>
                <span
                    style={{
                        ...styles.navItem,
                        ...(activeTab === 'notice' ? styles.activeNavItem : styles.inactiveNavItem)
                    }}
                    onClick={() => setActiveTab('notice')}
                >
                    공지사항
                </span>
                <span
                    style={{
                        ...styles.navItem,
                        ...(activeTab === 'faq' ? styles.activeNavItem : styles.inactiveNavItem)
                    }}
                    onClick={() => setActiveTab('faq')}
                >
                    자주하는 질문
                </span>
            </div>

            {/* 컨텐츠 영역 */}
            {activeTab === 'notice' ? (
                <>
                    <div style={styles.noticeList}>
                        {currentNotices.map((notice) => (
                            <div key={notice.id} style={styles.noticeItem}>
                                <div
                                    style={styles.noticeHeader}
                                    onClick={() => toggleItem(notice.id)}
                                >
                                    <div style={styles.noticeInfo}>
                                        <span style={{
                                            ...styles.noticeType,
                                            ...(notice.type === '중요공지' ? styles.importantNotice : styles.normalNotice)
                                        }}>
                                            {notice.type}
                                        </span>
                                        <span style={styles.noticeTitle}>{notice.title}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <span style={styles.noticeDate}>{notice.date}</span>
                                        <span style={{
                                            ...styles.arrow,
                                            ...(activeItem === notice.id ? styles.arrowActive : {})
                                        }}>+</span>
                                    </div>
                                </div>
                                {activeItem === notice.id && (
                                    <div style={styles.noticeContent}>
                                        {notice.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 페이지네이션 수정 */}
                    {notices.length > noticesPerPage && (
                        <div style={styles.pagination}>
                            <button
                                style={styles.pageButton}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                이전
                            </button>

                            {getPageNumbers().map((number) => (
                                <button
                                    key={number}
                                    style={{
                                        ...styles.pageNumberButton,
                                        ...(currentPage === number ? styles.activePageButton : {})
                                    }}
                                    onClick={() => setCurrentPage(number)}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                style={styles.pageButton}
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
                <div style={styles.noticeList}>
                    {faqs.map((faq) => (
                        <div key={faq.id} style={styles.noticeItem}>
                            <div
                                style={styles.noticeHeader}
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <div style={styles.noticeInfo}>
                                    <span style={{
                                        ...styles.noticeType,
                                        ...styles.faqCategory[faq.category]
                                    }}>
                                        {faq.category}
                                    </span>
                                    <span style={styles.noticeTitle}>{faq.question}</span>
                                </div>
                                <span style={{
                                    ...styles.arrow,
                                    ...(activeFaq === faq.id ? styles.arrowActive : {})
                                }}>+</span>
                            </div>
                            {activeFaq === faq.id && (
                                <div style={styles.noticeContent}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* 글쓰기 버튼 */}
            <button
                style={styles.writeButton}
                onClick={() => setIsModalOpen(true)}
            >
                글쓰기
            </button>

            {/* 글쓰기 모달 */}
            {isModalOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>공지 유형</label>
                                <select
                                    name="type"
                                    value={newNotice.type}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                >
                                    <option value="중요공지">중요공지</option>
                                    <option value="일반공지">일반공지</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>제목</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newNotice.title}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>내용</label>
                                <textarea
                                    name="content"
                                    value={newNotice.content}
                                    onChange={handleInputChange}
                                    style={styles.textarea}
                                    required
                                />
                            </div>

                            <div style={styles.buttonGroup}>
                                <button
                                    type="button"
                                    style={styles.cancelButton}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    취소
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    등록
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 풋터 추가 */}
            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div>
                        <div style={styles.footerLeft}>
                            <a href="#" style={styles.footerLink}>개인정보처리방침</a>
                            <a href="#" style={styles.footerLink}>저작권정책</a>
                            <a href="#" style={styles.footerLink}>부서별 전화번호</a>
                            <a href="#" style={styles.footerLink}>영덕군 오시는 길</a>
                            <a href="#" style={styles.footerLink}>청사안내도</a>
                            <a href="#" style={styles.footerLink}>사이트맵</a>
                            <a href="#" style={styles.footerLink}>원격지원</a>
                            {/* 내일 와서 제일 먼저 해결해야 할 문제
              이거 a 태그 href 쓰면 안되고 Link 써서 이동하거나 modal 창으로 띄워야하는데 어떻게 할지는 생각해보기 */}
                        </div>
                        <div style={styles.footerInfo}>
                            <p>경기 성남시 분당구 돌마로 46 5층 그린컴퓨터아카데미 성남분당점</p>
                            <p>대표전화: 010-2523-2625 &nbsp;&nbsp;&nbsp;팩스: 부서별안내&nbsp;&nbsp;&nbsp;이메일: aqs56874@gmail.com</p>
                            <p>© 미금 그린아카데미</p>
                        </div>
                    </div>
                    <div>
                        <img src="112.jpg" alt="하트" style={styles.footerLogo} />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NoticeBoard;