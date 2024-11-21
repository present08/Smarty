import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
    apiKey: "BOfKp82VMmDat4yOTyK3Kd-I6B8j2Xmt_3wio76qYaU_2-LvM_Q3Khp_ItOXQS8Md9WCPaCcneHKTrmkc1WdUZM",
    authDomain: "smarty-b95c3.firebaseapp.com",
    databaseURL: "https://smarty-b95c3.firebaseio.com",
    projectId: "smarty-b95c3",
    storageBucket: "smarty-b95c3.appspot.com",
    messagingSenderId: "464758368298"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = async () => {
    try {
        const token = await messaging.getToken({ vapidKey: BOfKp82VMmDat4yOTyK3Kd - I6B8j2Xmt_3wio76qYaU_2 - LvM_Q3Khp_ItOXQS8Md9WCPaCcneHKTrmkc1WdUZM });
        console.log("User token : ", token);
        return token;
    } catch (error) {
        console.log("Error getting token", error);
        throw error;
    }
}

// Firebase FCM 토큰 생성 및 서버 전송
