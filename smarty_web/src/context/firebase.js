import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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
    console.log("Step 1: Starting getFCMToken function");
    try {
        console.log("Step 2: Attempting to get token");
        const token = await getToken(messaging, { vapidKey: "BL5sHWEB--rDYVffjvHXmasZaYkf7sAR7x8Xx6UMRADBH6rBbV15HF5C55U7OYNjJL20pmeuk10kpFYINUeUC6U" });  //토큰 발급(firebase)
        console.log("Step 3: Token retrieved:", token);
        if (token) { //토큰값이 있을 경우
            console.log("token:", token);
            //SetFCMToken(token); //Context API를 이용해 해당 값 저장
            return token; //토큰 값 반환
        } else {
            console.warn("no token");
            return;
        }
    } catch (error) {
        console.log("Error fetching FCM token : ", error.message, error);
        return;
    }
}
export { messaging, getFCMToken };
