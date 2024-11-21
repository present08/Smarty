package com.green.smarty.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.green.smarty.service.FCMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class FCMController {
    @Autowired
    private FCMService fcmService;

    @PostMapping("/fcmToken")
    @ResponseBody
    public String saveFCMToken(@RequestBody Map<String, String> requestBody/*, @RequestBody String userId*/){
        String token = requestBody.get("token");
        System.out.println("token received : "+token);
        ObjectMapper mapper = new ObjectMapper();

        //db에 token 저장하는 로직
        try{
            fcmService.sendNotification(token, "title", "message");
        }catch(Exception e){
            e.printStackTrace();
        }
        return "";
    }
}
