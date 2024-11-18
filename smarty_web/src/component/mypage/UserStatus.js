import React, { useState, useEffect } from 'react';

const UserStatus = (props) => {

    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setStatus(props.user);
    }, [props]);

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
