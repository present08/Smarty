import React, { useEffect, useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import '../../css/announcement.css';
import axios from 'axios';
import MainNav from '../MainNav';
import Wrapper from '../Wrapper';
import BackToTopButton from '../BackToTopButton';
import Footer from '../Footer';

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
        const currentDate = new Date().toISOString().replace('Z', '');
        const newNoticeItem = {
            ...announcements,
            send_date: currentDate
        };
        try {
            const response = await axios.post("http://localhost:8080/notice/board/user/write", newNoticeItem);
            if (response.data) {
                const updatedResponse = await axios.get("http://localhost:8080/notice/board/user/nodeletelist");
                setBoards(updatedResponse.data);

                setAnnouncements({
                    title: '',
                    content: '',
                    send_date: '',
                    content_type: '',
                    view_count: 0,
                    good_btn: 0,
                    bad_btn: 0
                });
                alert('게시글이 등록되었습니다.');
            }
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsModalState(false);
        }
    }

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get("http://localhost:8080/notice/board/user/nodeletelist");
                console.log('서버 응답 데이터:', response.data);
                setBoards(response.data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            }
        };
        fetchNotices();
    }, []);

    const toggleItem = async (board_id) => {
        try {
            await axios.post(`http://localhost:8080/notice/board/user/view/${board_id}`);
            navigate(`/notice/board/${board_id}`)
        } catch (error) {
            console.error('조회수 업데이트 실패:', error);
        }
    }

    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <div className="nb-notice-board">
                <div className="nb-header">
                    <h1 className="nb-header-title">공지사항</h1>
                    <p className="nb-header-subtitle">SMARTY의 새로운 소식을 확인하세요</p>
                </div>

                <div className="container">
                    <div className="button-container">
                        <div>
                            <h2 className="page-title">전체 게시글</h2>
                        </div>
                        <button
                            className="write-button"
                            onClick={() => setIsModalState(true)}
                        >
                            글쓰기
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
                                        key={item.id}
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
                                                <div className='form-group' q>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Announcement;
