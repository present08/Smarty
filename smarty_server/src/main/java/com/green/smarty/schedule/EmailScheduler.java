package com.green.smarty.schedule;

import com.green.smarty.dto.RentalDTO;
import com.green.smarty.mapper.UserRentalMapper;
import com.green.smarty.service.UserRentalService;
import com.green.smarty.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
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

    @Scheduled(cron = "0 */1 * * * *")
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
//        @Scheduled(cron = "* */1 * * * *")
//        public void oneDayEnter()

    }

