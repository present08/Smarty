import React from 'react';
import { useNavigate } from 'react-router-dom';

function Announcement() {
    const navigate = useNavigate();

    // 더미 데이터 추가 (나중에 백엔드 연동 시 대체될 부분)
    const announcements = [
        { id: 1, title: '안녕하세요! 처음 가입했습니다 :)', author: '김철수', date: '2024-03-20', views: 42 },
        { id: 2, title: '운동 같이하실 분 구해요~', author: '박지민', date: '2024-03-19', views: 38 },
        { id: 3, title: '오늘 저녁 같이 러닝하실 분?', author: '이하늘', date: '2024-03-18', views: 56 },
        { id: 4, title: '운동 초보자인데 조언 부탁드려요', author: '정다운', date: '2024-03-17', views: 89 },
    ];

    const styles = {
        header: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: '40px',
            height: '250px',
            backgroundImage: 'linear-gradient(to right, #4A90E2, #357ABD)',
            backgroundSize: 'cover',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        headerContent: {
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            padding: '0 20px',
        },
        headerTitle: {
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        headerSubtitle: {
            fontSize: '16px',
            opacity: 0.9
        },
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px',
        },
        tableContainer: {
            width: '100%',
            marginTop: '20px',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            backgroundColor: '#f7f9fc',
            padding: '16px',
            textAlign: 'left',
            borderBottom: '1px solid #e8e8e8',
            color: '#333',
            fontWeight: '600',
            fontSize: '14px',
        },
        td: {
            padding: '16px',
            borderBottom: '1px solid #e8e8e8',
            color: '#666',
            fontSize: '14px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        writeButton: {
            padding: '10px 20px',
            backgroundColor: '#4A90E2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            '&:hover': {
                backgroundColor: '#357ABD',
            },
        },
        row: {
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        rowHover: {
            backgroundColor: '#f7f9fc',
        },
        title: {
            color: '#333',
            fontWeight: '500',
        },
        author: {
            color: '#666',
            fontSize: '13px',
        },
    };

    return (
        <div style={{ backgroundColor: '#f7f9fc', minHeight: '100vh', width: '100%' }}>
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={styles.headerTitle}>커뮤니티</h1>
                    <p style={styles.headerSubtitle}>회원들과 자유롭게 소통해보세요</p>
                </div>
            </div>

            <div style={styles.container}>
                <div style={styles.buttonContainer}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '20px', color: '#333' }}>전체 게시글</h2>
                    </div>
                    <button
                        style={styles.writeButton}
                        onClick={() => navigate('/announcement/write')}
                    >
                        글쓰기
                    </button>
                </div>

                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: '8%' }}>번호</th>
                                <th style={{ ...styles.th, width: '45%' }}>제목</th>
                                <th style={{ ...styles.th, width: '15%' }}>작성자</th>
                                <th style={{ ...styles.th, width: '17%' }}>작성일</th>
                                <th style={{ ...styles.th, width: '15%' }}>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((item) => (
                                <tr
                                    key={item.id}
                                    style={styles.row}
                                    onClick={() => navigate(`/announcement/${item.id}`)}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f9fc'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={styles.td}>{item.id}</td>
                                    <td style={{ ...styles.td, ...styles.title }}>{item.title}</td>
                                    <td style={{ ...styles.td, ...styles.author }}>{item.author}</td>
                                    <td style={styles.td}>{item.date}</td>
                                    <td style={styles.td}>{item.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Announcement;
