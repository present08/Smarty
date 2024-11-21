import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyAQgG03woC9QFnVaAK1XGCWdZ1OxwD1dCI",
    authDomain: "smarty-b95c3.firebaseapp.com",
    projectId: "smarty-b95c3",
    storageBucket: "smarty-b95c3.firebasestorage.app",
    messagingSenderId: "464758368298",
    appId: "1:464758368298:web:442fa4f2762fc31e223b53",
    measurementId: "G-3TLRCE6VLG"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const sendTokenToBackend = async () => {
    console.log("function called");
    try {
        const token = await getToken(messaging, { vapidKey: "BOfKp82VMmDat4yOTyK3Kd-I6B8j2Xmt_3wio76qYaU_2-LvM_Q3Khp_ItOXQS8Md9WCPaCcneHKTrmkc1WdUZM" });
        if (token) {
            console.log("token:", token);
            //user id 가져오는 로직
            await axios.post("http://localhost:8080/fcmToken", { token: token });
        } else {
            console.log("no token");
        }
    } catch (err) {
        console.log("err", err);
    }
}


export { messaging, sendTokenToBackend };