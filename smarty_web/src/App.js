import { RouterProvider } from 'react-router-dom';  // BrowserRouter, Route, Routes 제거
import './App.css';
import root from './router/root';
import { sendTokenToBackend } from './firebase';
import { useEffect } from 'react';
import NotificationHandler from './NotificationHandler';


function App() {
  useEffect(() => {

    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log("registered", registration);
          })
          .catch((err) => {
            console.log("error", err);
          })
      }
    }

    const requestNotificationPermisson = async () => {
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          return;
        }
      }
      sendTokenToBackend();
    };

    registerServiceWorker();
    requestNotificationPermisson();
  }, []);

  return (
    <div className="App main-content">
      <NotificationHandler />
      <RouterProvider router={root}></RouterProvider>
    </div>
  );
}
export default App;