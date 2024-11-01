package com.green.smarty.controller.formatter;

import org.springframework.format.Formatter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class LocalDateFormatter implements Formatter<LocalDateTime> {
    // 데이터 통신 시 날짜, 시간 데이터 타입 변환
    // 브라우저 -> 문자열로 전송
    // 서버 -> LocalDate, LocalDateTime으로 처리
    // 스프링 MVC 동작 과정에서 사용될 수 있도록 CustomServletConfig에 설정 추가

    @Override
    public LocalDateTime parse(String text, Locale locale) {
        return LocalDateTime.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    @Override
    public String print(LocalDateTime object, Locale locale) {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(object);
    }
}
