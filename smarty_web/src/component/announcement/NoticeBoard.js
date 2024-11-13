import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/noticeBoard.css';
import Footer from '../Footer';
import MainNav from '../MainNav';
import Wrapper from '../Wrapper';

function Announcement() {
    const navigate = useNavigate();

    const announcements = [
        { id: 1, title: '안녕하세요! 처음 가입했습니다 :)', author: '김철수', date: '2024-03-20', views: 42 },
        { id: 2, title: '운동 같이하실 분 구해요~', author: '박지민', date: '2024-03-19', views: 38 },
        { id: 3, title: '오늘 저녁 같이 러닝하실 분?', author: '이하늘', date: '2024-03-18', views: 56 },
        { id: 4, title: '운동 초보자인데 조언 부탁드려요', author: '정다운', date: '2024-03-17', views: 89 },
    ];

    return (
        <>
            <MainNav />
            <Wrapper />
            <div className="notice-board">
                <div className="header">
                    <div className="header-content">
                        <h1 className="header-title">커뮤니티</h1>
                        <p className="header-subtitle">회원들과 자유롭게 소통해보세요</p>
                    </div>
                </div>

                <div className="container">
                    <div className="button-container">
                        <div>
                            <h2 className="page-title">전체 게시글</h2>
                        </div>
                        <button
                            className="write-button"
                            onClick={() => navigate('/announcement/write')}
                        >
                            글쓰기
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="th" style={{ width: '8%' }}>번호</th>
                                    <th className="th" style={{ width: '45%' }}>제목</th>
                                    <th className="th" style={{ width: '15%' }}>작성자</th>
                                    <th className="th" style={{ width: '17%' }}>작성일</th>
                                    <th className="th" style={{ width: '15%' }}>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="table-row"
                                        onClick={() => navigate(`/announcement/${item.id}`)}
                                    >
                                        <td className="td">{item.id}</td>
                                        <td className="td title">{item.title}</td>
                                        <td className="td author">{item.author}</td>
                                        <td className="td">{item.date}</td>
                                        <td className="td">{item.views}</td>
                                    </tr>
                                ))}
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
