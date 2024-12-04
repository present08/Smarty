package com.green.smarty.schedule;

import com.green.smarty.dto.NotificationDTO;
import com.green.smarty.dto.RentalDTO;
import com.green.smarty.dto.ReservationDTO;
import com.green.smarty.mapper.*;
import com.green.smarty.service.UserRentalService;
import com.green.smarty.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class EmailScheduler {

    @Autowired
    private UserRentalService userRentalService;
    @Autowired
    private JavaMailSender javaMailsender;
    @Autowired
    private UserService userService;
    @Autowired
    private UserReservationMapper userReservationMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserFacilityMapper userFacilityMapper;
    @Autowired
    private NotificationMapper notificationMapper;


    @Scheduled(cron = "0 9 * * * *")
    public void sendOverdue() {
        List<RentalDTO> overdueRentals = userRentalService.getOverdueRentals();
        for(RentalDTO rentalDTO : overdueRentals){
            try{
                String email = userRentalService.getEmailByUserId(rentalDTO.getUser_id());
                sendEmail(email, rentalDTO);
                System.out.println("이메일 발송 완료 : " + email);
            }catch (Exception e){
                System.out.println("이메일 발송 실패 : {}" + e);
            }
        }


        }
        private void sendEmail(String email, RentalDTO rentalDTO ) throws MessagingException{

            LocalDateTime today = LocalDateTime.now();
            LocalDateTime rentalDate = rentalDTO.getRental_date();

            long overdueDays = ChronoUnit.DAYS.between(rentalDate, today) -3;
            overdueDays = Math.max(overdueDays, 0);


            MimeMessage message = javaMailsender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("반납 연체 알림");
            helper.setText("<h1>연체된 대여 물품이 있어서 안내 드립니다.</h1>"
            + "<p> 상품 ID :" + rentalDTO.getProduct_id() + "</p>"
            + "<p> 연체 일수 : " + overdueDays + " </p>" , true);

            javaMailsender.send(message);
        }

    @Scheduled(cron = "0 9 * * * *") // 매일 아침 9시에 실행
    public void sendSevendaysBefore() {
        List<ReservationDTO> upcomingSevenDays = userReservationMapper.getStartBeforeSevendays();

        for (ReservationDTO reservationDTO : upcomingSevenDays) {

            String email = userMapper.getUserEmailById(reservationDTO.getUser_id());
            String facilityName = userFacilityMapper.getFacilityNameById(reservationDTO.getFacility_id());
            String emailContent =
                    "<h1>안녕하세요!</h1>" +
                            "<p>예약하신 일정이 7일 앞으로 다가왔습니다</p>" +
                            "<p>시설 이름: " + facilityName + "</p>" +
                            "<p>코트 번호: " + reservationDTO.getCourt_id() + "</p>" +
                            "<p>예약 시작: " + reservationDTO.getReservation_start() + "</p>" +
                            "<p>예약 종료: " + reservationDTO.getReservation_end() + "</p>" +
                            "<p>기타 문의 사항이 있으시면 고객센터로 연락 주세요.</p>";
            try {
                // 이메일 내용 생성

                // 이메일 전송
                sendSevendaysBefore(email, emailContent);
                // 알림 정보 생성
                NotificationDTO notificationDTO = new NotificationDTO();
                notificationDTO.setUser_id(reservationDTO.getUser_id());
                notificationDTO.setMessage(emailContent); // 이메일 본문을 메시지로 설정
                notificationDTO.setStatus("SUCCESS");
                notificationDTO.setUser_name(userMapper.getUserNameById(reservationDTO.getUser_id()));
                notificationDTO.setMessage_type("예약 7일 전 알림");
                notificationDTO.setResponse_detail("Email sent successfully to " + email);
                notificationMapper.insertByNotificationId(notificationDTO);

                System.out.println("7일 전 이메일 발송 완료: " + email);
            } catch (Exception e) {

                NotificationDTO notificationDTO = new NotificationDTO();
                notificationDTO.setUser_id(reservationDTO.getUser_id());
                notificationDTO.setMessage(emailContent); // 이메일 본문을 메시지로 설정
                notificationDTO.setStatus("FAILURE");
                notificationDTO.setUser_name(userMapper.getUserNameById(reservationDTO.getUser_id()));
                notificationDTO.setMessage_type("예약 7일 전 알림");
                notificationDTO.setResponse_detail("이메일 발송 실패 : {}" + e);
                notificationMapper.insertByNotificationId(notificationDTO);

                System.out.println("7일 전 이메일 발송 실패: " + e.getMessage());
            }
        }
    }

    private void sendSevendaysBefore(String email, String emailContent) throws MessagingException {
        MimeMessage message = javaMailsender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(email);
        helper.setSubject("예약 7일 전 알림");
        helper.setText(emailContent, true); // 이메일 본문 설정
        javaMailsender.send(message);
    }


    }

