console.log("3");
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
console.log("4");

firebase.initializeApp({
    apiKey: "AIzaSyAQgG03woC9QFnVaAK1XGCWdZ1OxwD1dCI",
    authDomain: "smarty-b95c3.firebaseapp.com",
    projectId: "smarty-b95c3",
    storageBucket: "smarty-b95c3.firebasestorage.app",
    messagingSenderId: "464758368298",
    appId: "1:464758368298:web:442fa4f2762fc31e223b53",
    measurementId: "G-3TLRCE6VLG"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background message received:", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
