import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Community = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/notice/allList');
                setPosts(response.data);
            } catch (error) {
                console.error('게시글을 불러오는데 실패했습니다:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <CommunityContainer>
            <Title>커뮤니티</Title>
            <PostList>
                {posts.map((post) => (
                    <PostItem key={`${post.source}-${post.id}`}>
                        <PostHeader>
                            <PostTitle>{post.title}</PostTitle>
                            <PostInfo>
                                <span>조회수: {post.view_count}</span>
                                <span>작성일: {new Date(post.send_date).toLocaleDateString()}</span>
                                <PostType>{post.content_type}</PostType>
                            </PostInfo>
                        </PostHeader>
                        <PostContent>{post.content}</PostContent>
                    </PostItem>
                ))}
            </PostList>
        </CommunityContainer>
    );
};

const CommunityContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
`;

const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PostItem = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
    margin-bottom: 10px;
`;

const PostTitle = styled.h2`
    font-size: 18px;
    margin-bottom: 8px;
    color: #333;
`;

const PostInfo = styled.div`
    display: flex;
    gap: 15px;
    font-size: 14px;
    color: #666;
`;

const PostType = styled.span`
    background-color: #e6f3ff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #0066cc;
`;

const PostContent = styled.p`
    font-size: 16px;
    color: #444;
    line-height: 1.5;
`;

export default Community;
