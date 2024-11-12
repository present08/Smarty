import React, { useEffect, useState } from 'react';

const ChatApp = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('http://localhost:5000');

        // WebSocket 연결 열기
        socket.onopen = () => {
            console.log('WebSocket 연결이 열렸습니다.');
            // 데이터 요청
            socket.send(JSON.stringify({ type: 'FETCH_DATA' })); // 요청 타입에 맞게 조정
        };

        // 메시지 수신
        socket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);

            // 데이터 수신 후 상태 업데이트
            if (messageData.type === 'DATA_RESPONSE') { // 응답 타입에 맞게 조정
                setData(messageData.data);
                setLoading(false); // 데이터 수신 후 로딩 해제
            }
        };

        // 오류 처리
        socket.onerror = (error) => {
            console.error('WebSocket 오류:', error);
            setError('WebSocket 오류가 발생했습니다.');
            setLoading(false);
        };

        // WebSocket 연결 닫기
        socket.onclose = () => {
            console.log('WebSocket 연결이 닫혔습니다.');
            setLoading(false);
        };

        // 컴포넌트 언마운트 시 WebSocket 연결 닫기
        return () => {
            socket.close();
        };
    }, []);

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중 메시지
    }

    if (error) {
        return <div>오류 발생: {error}</div>; // 오류 처리
    }

    return (
        <div>
            <h2>받은 데이터</h2>
            {data && data.map((item, index) => (
                <div key={index}>{item}</div> // 실제 데이터에 맞게 수정
            ))}
        </div>
    );
};

export default ChatApp;
