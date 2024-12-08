import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainNav from '../MainNav';
import BackToTopButton from '../BackToTopButton';
import Footer from '../Footer';
import Wrapper from '../Wrapper';
import '../../css/Community.css';

const Community = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/notice/allList');
                setPosts(response.data);
            } catch (error) {
                console.error('게시글을 불러오는데 실패했습니다:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <div className="community-container">
                <h1 className="community-title">커뮤니티</h1>
                <div className="post-list">
                    {posts.map((post) => (
                        <div className="post-item" key={`${post.source}-${post.id}`}>
                            <div className="post-category">
                                <span className={`category-tag ${post.source === 'board' ? 'board-type' : 'notice-type'}`}>
                                    {post.source === 'board' ? '자유게시판' : '공지사항'}
                                </span>
                            </div>
                            <h2 className="community-post-title">{post.title}</h2>
                            <div className="post-preview">
                                <p className="post-content">{post.content}</p>
                                <div className="content-fade"></div>
                            </div>
                            <div className="post-footer">
                                <span className="post-date">
                                    작성일 : {new Date(post.send_date).toLocaleDateString()}
                                </span>
                                <span className="view-count">
                                    <i className="fas fa-eye"></i> 조회수 : {post.view_count}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Community;
