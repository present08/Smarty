package com.green.smarty.service;

import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.stereotype.Service;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void sendNotification(String token, String title, String body){
        Message message = Message.builder()
                .setToken(token)
                .putData("title", title)
                .putData("body", body)
                .build();

        try{
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Sent message : " + response);
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
