import { RouterProvider } from 'react-router-dom';
import './App.css';
import root from './router/root';
import { getFCMToken } from './firebase';
import { useEffect } from 'react';
import NotificationHandler from './NotificationHandler';


function App() {
  useEffect(() => {

    const registerServiceWorker = async () => {
      console.log("Registering service worker...");
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log("Service Worker registered successfully:", registration);
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      } else {
        console.error("Service workers are not supported in this browser.");
      }
    };


    const requestNotificationPermisson = async () => { //알림 권한 요청
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          return;
        }
      }
    };

    registerServiceWorker();
    requestNotificationPermisson();
    getFCMToken(); //토큰 발급
  }, []);

  return (
    <div className="App main-content">
      <NotificationHandler />
      <RouterProvider router={root}></RouterProvider>
    </div>
  );
}
export default App;