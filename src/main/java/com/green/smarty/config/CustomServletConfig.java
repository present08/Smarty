package com.green.smarty.config;

import com.green.smarty.controller.formatter.LocalDateFormatter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CustomServletConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
    }

    // CORS 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // 애플리케이션의 모든 경로에 대해 CORS 설정 적용
                .allowedOrigins("*")
                // 모든 도메인에서 오는 요청 허용
                .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS")
                // 서버가 허용하는 HTTP 메서드 정의
                // pre-flight 요청을 위해 OPTIONS는 반드시 허용해야 함
                .maxAge(300) // 5분
                // 캐싱 시간 : 브라우저가 pre-flight 요청을 다시 보내지 않고 CORS 정책을 캐시할지 결정
                .allowedHeaders("Authorization", "Cache-Control", "Content-Type");
                // 클라이언트가 요청할 때 사용할 수 있는 헤더 지정
    }
}