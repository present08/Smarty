package com.green.smarty.service;

import com.google.type.DateTime;
import com.green.smarty.dto.NotificationDTO;
import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.mapper.NotificationMapper;
import com.green.smarty.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.N;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class SendEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private NotificationMapper notificationMapper;

    // (영준) 메일 전송
    @Autowired
    private UserMapper userMapper;

    public String sendWelcomeEmail(String email, String user_name, String user_id) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText("안녕하세요!" + user_name + "님! \n\n smarty 서비스에 가입해주셔서 감사합니다 \n" + "앞으로 더 좋은 서비스로 보답하겠습니다. \n\n 감사합니다!");

        try {
            message.setFrom("smartytf33@gmail.com"); // 발신자
            message.setTo(email); // 수신자
            message.setSubject("회원 가입을 축하드립니다"); // 이메일 제목
            javaMailSender.send(message);

            // NotificationDTO 생성 및 Database 저장
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setUser_id(user_id);
            notificationDTO.setUser_name(user_name);
            notificationDTO.setMessage(message.getText());
            notificationDTO.setStatus("SUCCESS");
            notificationDTO.setResponse_detail("Email sent successfully to " + email);
            notificationDTO.setMessage_type("가입인사");
            notificationMapper.insertByNotificationId(notificationDTO);
            log.info("이메일이 {} 에게 성공적으로 전송되었습니다", email);
            return "SUCCESS";
        } catch (Exception e) {
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setUser_id(user_id);
            notificationDTO.setUser_name(user_name);
            notificationDTO.setMessage(message.getText());
            notificationDTO.setStatus("FAILURE");
            notificationDTO.setMessage_type("가입인사");
            notificationDTO.setResponse_detail(e.getMessage());
            notificationMapper.insertByNotificationId(notificationDTO);
            log.error("이메일 전송 중 오류 발생 : {}", e.getMessage());
            return "FAILURE";
        }
    }

    public String sendClassReservation(String email, String user_name, String formattedStart, String formattedEnd, String court_id)
        {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setText("안녕하세요!" + user_name + "님! \n" + formattedStart + "부터" + formattedEnd + "까지 코트번호 : " + court_id + "예약을 신청해 주셨습니다!\n" +
                    "결제가 완료되면 즉시 예약이 완료 됩니다!");
            try {
                String userId = userMapper.getIdByEmail(email);
                msg.setFrom("smartytf33@gmail.com");
                msg.setTo(email);
                msg.setSubject("일일 예약 안내");
                javaMailSender.send(msg);
                NotificationDTO notificationDTO = new NotificationDTO();
                notificationDTO.setUser_id(userId);
                notificationDTO.setMessage(msg.getText());
                notificationDTO.setStatus("SUCCESS");
                notificationDTO.setUser_name(user_name);
                notificationDTO.setMessage_type("일일 예약 안내");
                notificationDTO.setResponse_detail("Email sent successfully to " + email);
                notificationMapper.insertByNotificationId(notificationDTO);
                return "SUCCESS";
            } catch (Exception e) {
                NotificationDTO notificationDTO = new NotificationDTO();
                notificationDTO.setResponse_detail(e.getMessage());
                notificationDTO.setMessage(msg.getText());
                notificationDTO.setStatus("FAILURE");
                notificationDTO.setMessage_type("일일 예약 안내");
                notificationDTO.setUser_name(user_name);
                notificationDTO.setUser_id(notificationDTO.getUser_id());
                notificationMapper.insertByNotificationId(notificationDTO);
                return "FAILURE";
            }
    }
}
