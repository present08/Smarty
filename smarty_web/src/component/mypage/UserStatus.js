import React, { useState, useEffect } from 'react';
import axios from 'axios';

const host = 'http://localhost:8080';

const UserStatus = ({ userId }) => {
    
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await axios.get(`${host}/api/auth/me/${userId}`);
                setStatus(response.data); 
            } catch (err) {
                setError('사용자 상태를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false); 
            }
        };

        fetchUserStatus();
    }, [userId]); 

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>사용자 상태</h2>
            <p>{status}</p>
        </div>
    );
};

export default UserStatus;
