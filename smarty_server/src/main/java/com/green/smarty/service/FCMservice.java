package com.green.smarty.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FCMservice {
    private final FirebaseMessaging firebaseMessaging;

    public void sendRentalNotification(String token , String username , String productName) {
        try{
            Notification notification = Notification.builder()
                    .setTitle("대여 신청 완료")
                    .setBody(username + "님, " + productName + "대여 신청이 완료되었습니다")
                    .build();

            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(notification)
                    .putData("type" , "rental")
                    .putData("productName" , productName)
                    .build();

            String response = firebaseMessaging.send(message);
            log.info("알림 전송 성공 : {}" , response );
        }catch (Exception e){
            log.error("알림 전송 실패" , e);
        }
    }
}
