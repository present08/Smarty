import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { noticeApi } from '../../api/noticeApi';
import '../../css/announceModifyPage.css';

const AnnounceModifyPage = () => {
    const { announce_id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        type: 0,
        content: ''
    });

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await axios.get(`${noticeApi.announcement.getOneList(announce_id)}`);
                setFormData(response.data);
            } catch (error) {
                console.error('공지사항 조회 실패:', error);
            }
        };
        fetchAnnouncement();
    }, [announce_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await noticeApi.announcement.modifyNotice(announce_id, formData);
            alert('공지사항이 수정되었습니다.');
            navigate('/notice/announce');
        } catch (error) {
            console.error('공지사항 수정 실패:', error);
            alert('공지사항 수정에 실패했습니다.');
        }
    };

    return (
        <div className="announce-modify-container">
            <h1>공지사항 수정</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="10"
                    />
                </div>
                <div className="button-group">
                    <button type="submit">수정하기</button>
                    <button type="button" onClick={() => navigate('/notice/announce')}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AnnounceModifyPage;