package com.green.smarty.schedule;

import com.green.smarty.dto.RentalDTO;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.mapper.UserRentalMapper;
import com.green.smarty.service.FCMService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component //bean 등록
@Slf4j
public class NotificationSchedule {
    @Autowired
    private FCMService fcmService;
    @Autowired
    private UserRentalMapper userRentalMapper;
    @Autowired
    private UserMapper userMapper;

    @Scheduled(cron = "* * * 9 * *") //매일 실행
    public void sendNotification(){
        List<RentalDTO> rentalDTOS = userRentalMapper.getAllRentals(); //모든 rental 객체 가져오기

        for(RentalDTO rental :rentalDTOS){
            LocalDateTime returnDate = rental.getReturn_date(); //반납일자
            LocalDateTime today = LocalDateTime.now(); //오늘 날짜
            long difference = ChronoUnit.DAYS.between(returnDate, today); //오늘 날짜에서 반납 일자 빼기
            String fcmToken = userMapper.finByIdFcm(rental.getUser_id()); //fcm토큰
            log.info(fcmToken);

            if(difference==-7) try{ fcmService.sendNotification(fcmToken, "제목", "대여 만료 일주일 전입니다."); }catch (Exception e) { e.printStackTrace(); } //7일 전일 경우
            if(difference==-1) try{ fcmService.sendNotification(fcmToken, "제목", "대여 만료 하루 전입니다."); }catch (Exception e) { e.printStackTrace(); } //하루 전일 경우
            if (difference>0&&difference%7==0) try{ fcmService.sendNotification(fcmToken, "제목", String.format("대여 만료 %d일 후입니다..", difference)); }catch (Exception e) { e.printStackTrace(); } //7*n일 후일 경우


        }
    }

}
