package com.green.smarty.service;

import com.google.type.DateTime;
import com.green.smarty.dto.NotificationDTO;
import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.mapper.NotificationMapper;
import com.green.smarty.mapper.UserMapper;
import com.green.smarty.mapper.UserProductMapper;
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

    // (영준)
    @Autowired
    private UserMapper userMapper;
    // (영준)
    @Autowired
    private UserProductMapper userProductMapper;

    public String sendWelcomeEmail(String email, String user_name, String user_id) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText("😊 안녕하세요, " + user_name + "님! 🎉\n\n"
                + "smarty 서비스를 이용해주셔서 정말 감사드려요! 💖\n"
                + "앞으로도 더 나은 서비스로 보답할게요. 🙌\n\n"
                + "💌 가입을 진심으로 축하드립니다!\n\n"
                + "감사합니다! 🥰");

        try {
            message.setFrom("smartytf33@gmail.com"); // 발신자
            message.setTo(email); // 수신자
            message.setSubject("🎉 회원 가입을 축하드립니다!"); // 이메일 제목
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

    public String rentalProduct(String email, String user_name, String product_name) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setText("😊 안녕하세요, " + user_name + "님! \n\n"
                + "SMARTY에서 " + product_name + "을(를) 대여해 주셔서 감사합니다! 🙏\n\n"
                + "멋진 선택에 진심으로 감사드리며, SMARTY가 항상 최고의 경험을 드릴 수 있도록 노력하겠습니다. 💪\n\n"
                + "행복한 하루 되세요! 🌟");

        try {
            simpleMailMessage.setFrom("smartytf33@gmail.com"); // 발신자
            simpleMailMessage.setTo(email); // 수신자
            simpleMailMessage.setSubject("🎉 물품 대여 감사 메일"); // 이메일 제목
            javaMailSender.send(simpleMailMessage);

            // NotificationDTO 생성 및 Database 저장
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setResponse_detail("Success sent message to: " + email);
            notificationDTO.setMessage(simpleMailMessage.getText());
            notificationDTO.setStatus("SUCCESS");
            notificationDTO.setMessage_type("물품 대여 안내");
            notificationDTO.setUser_name(user_name);
            notificationDTO.setUser_id(notificationDTO.getUser_id());
            notificationMapper.insertByNotificationId(notificationDTO);
            log.info("이메일이 {} 에게 성공적으로 전송되었습니다", email);
            return "SUCCESS";
        } catch (Exception e) {
            log.error("메시지 발송 실패: {}", e.getMessage());

            // 실패 알림 저장
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setResponse_detail("발송 실패: " + e.getMessage());
            notificationDTO.setMessage(simpleMailMessage.getText());
            notificationDTO.setStatus("FAILURE");
            notificationDTO.setMessage_type("물품 대여 안내");
            notificationDTO.setUser_name(user_name);
            notificationDTO.setUser_id(notificationDTO.getUser_id());
            notificationMapper.insertByNotificationId(notificationDTO);
            return "FAILURE";
        }
    }

    public String sendClassReservation(String email, String user_name, String formattedStart, String formattedEnd, String facility_name, String court_id) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setText("😊 안녕하세요, " + user_name + "님!\n\n"
                + "📅 예약 내용:\n"
                + "⏰ " + formattedStart + "부터 " + formattedEnd + "까지\n"
                + "🏟️ 시설: " + facility_name + " (코트 번호: " + court_id + ")\n\n"
                + "✅ 예약이 성공적으로 완료되었습니다!\n"
                + "마이페이지에서 결제 내역을 확인해 주세요. 💳\n\n"
                + "항상 즐거운 시간을 보내시길 바랍니다! 🙌");

        try {
            String userId = userMapper.getIdByEmail(email); // User ID 조회
            msg.setFrom("smartytf33@gmail.com"); // 발신자
            msg.setTo(email); // 수신자
            msg.setSubject("🎉 일일 예약 결제 완료 안내"); // 이메일 제목
            javaMailSender.send(msg);

            // NotificationDTO 생성 및 데이터베이스 저장
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setResponse_detail("Success sent message to: " + email);
            notificationDTO.setMessage(msg.getText());
            notificationDTO.setStatus("SUCCESS");
            notificationDTO.setMessage_type("일일 예약 안내");
            notificationDTO.setUser_name(user_name);
            notificationDTO.setUser_id(userId); // 올바른 userId 설정
            notificationMapper.insertByNotificationId(notificationDTO);

            log.info("이메일이 {} 에게 성공적으로 전송되었습니다", email);
            return "SUCCESS";
        } catch (Exception e) {
            log.error("메시지 발송 실패: {}", e.getMessage());

            // 실패 알림 데이터베이스 저장
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setResponse_detail("발송 실패: " + e.getMessage());
            notificationDTO.setMessage(msg.getText());
            notificationDTO.setStatus("FAILURE");
            notificationDTO.setMessage_type("일일 예약 결제 완료 안내");
            notificationDTO.setUser_name(user_name);
            notificationDTO.setUser_id(userMapper.getIdByEmail(email)); // 실패 시에도 User ID 설정
            notificationMapper.insertByNotificationId(notificationDTO);

            return "FAILURE";
        }
    }


    public String sendClassReservation(String user_name, String class_name, String email) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setText(
                "안녕하세요, " + user_name + "님! \n\n" +
                        "저희 강의를 신청해 주셔서 진심으로 감사드립니다. 😊\n\n" +
                        "강의명: \"" + class_name + "\"\n\n" +
                        "수강 신청이 정상적으로 완료되었습니다. 강의와 함께 멋진 여정을 시작하시길 바랍니다! ✨\n" +
                        "더 궁금한 사항이 있으시면 언제든지 문의 부탁드립니다.\n\n" +
                        "감사합니다.\n"
        );

        try {
            simpleMailMessage.setFrom("smartytf33@gmail.com");
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("[스마트 아카데미] 강의 수강 신청 완료 안내");
            javaMailSender.send(simpleMailMessage);

            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setResponse_detail("Successfully sent message to " + email);
            notificationDTO.setMessage(simpleMailMessage.getText());
            notificationDTO.setStatus("SUCCESS");
            notificationDTO.setMessage_type("수강 신청 완료 안내");
            notificationDTO.setUser_name(user_name);
            notificationDTO.setUser_id(userMapper.getIdByEmail(email));
            notificationMapper.insertByNotificationId(notificationDTO);

            return "SUCCESS";
        } catch (Exception e) {
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setResponse_detail(e.getMessage());
            notificationDTO.setMessage(simpleMailMessage.getText());
            notificationDTO.setStatus("FAILURE");
            notificationDTO.setMessage_type("수강 신청 실패 안내");
            notificationDTO.setUser_name(user_name);
            notificationDTO.setUser_id(userMapper.getIdByEmail(email));
            notificationMapper.insertByNotificationId(notificationDTO);

            return "FAILURE";
        }
    }
}

