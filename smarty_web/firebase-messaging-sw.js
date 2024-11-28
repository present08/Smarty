// firebase-messaging-sw.js

/* // Firebase 라이브러리 가져오기
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js'); */

// Firebase 설정 초기화
firebase.initializeApp({
    apiKey: "AIzaSyAQgG03woC9QFnVaAK1XGCWdZ1OxwD1dCI",
    authDomain: "smarty-b95c3.firebaseapp.com",
    projectId: "smarty-b95c3",
    storageBucket: "smarty-b95c3.firebasestorage.app",
    messagingSenderId: "464758368298",
    appId: "1:464758368298:web:442fa4f2762fc31e223b53",
});

// 메시징 객체 생성
const messaging = firebase.messaging();

// 백그라운드에서 메시지 처리
messaging.onBackgroundMessage((payload) => {
    console.log('백그라운드 메시지 수신: ', payload);

    // 사용자에게 알림 표시
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
    });
});
