import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// React 18버전에서부터 ReactDOM.render 대신 createRoot 사용
// 기본 라우팅 설정 후 App 컴포넌트 내에서 경로 설정
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <App />
);