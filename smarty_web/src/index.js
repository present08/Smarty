import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 아임포트 SDK 동적 로드
const loadIamportSDK = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
  script.async = true; // 비동기 로드
  script.onload = () => {
      console.log('아임포트 SDK 로드 완료');
  };
  script.onerror = () => {
      console.error('아임포트 SDK 로드 실패');
  };
  document.body.appendChild(script);
};

// SDK 로드 실행
loadIamportSDK();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

reportWebVitals();
