package com.green.smarty.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class ItemConfig implements WebMvcConfigurer {


    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE","HEAD","OPTIONS")
                .maxAge(300)
                .allowedHeaders("Authorization", "Content-Type","Cache-Control");
    }
}
