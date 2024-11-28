import React, { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from "./firebase";

const NotificationHandler = () => {
    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("foreground message received:", payload);
            alert(`알림 수신됨 : ${payload.notification.title} - ${payload.notification.body}`);
        });

        return () => unsubscribe();
    }, []);

    return null; //UI없음
};

export default NotificationHandler;