import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { FCMProvider, useFCM } from "./context/FCMContext";

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

const getFCMToken = async () => {
    console.log("function called");
    try {
        const token = await getToken(messaging, { vapidKey: "BOfKp82VMmDat4yOTyK3Kd-I6B8j2Xmt_3wio76qYaU_2-LvM_Q3Khp_ItOXQS8Md9WCPaCcneHKTrmkc1WdUZM" });  //토큰 발급(firebase)
        if (token) { //토큰값이 있을 경우
            console.log("token:", token);
            //SetFCMToken(token); //Context API를 이용해 해당 값 저장
            return token; //토큰 값 반환
        } else {
            console.log("no token");
            return;
        }
    } catch (err) {
        console.log("err", err);
        return;
    }
}


export { messaging, getFCMToken };