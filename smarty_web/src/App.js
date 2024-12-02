import { RouterProvider } from 'react-router-dom';
import './App.css';
import root from './router/root';
import { getFCMToken } from './firebase';
import { useEffect } from 'react';
import NotificationHandler from './NotificationHandler';


function App() {

  useEffect(() => {

    const registerServiceWorker = () => { //Service Worker 등록
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log("가입완료", registration);
          })
          .catch((err) => {
            console.log("error", err);
          })
      }
    }

    const requestNotificationPermisson = async () => { //알림 권한 요청
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("허가")
          return;
        }
      }
    };

    registerServiceWorker();
    requestNotificationPermisson();
    getFCMToken(); //토큰 발급
  }, []);

  console.log(Notification.permission)

  return (
    <div className="App main-content" style={{ overflowX:'hidden' }}>
      <NotificationHandler />
      <RouterProvider router={root}></RouterProvider>
    </div>
  );
}
export default App;