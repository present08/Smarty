package com.green.smarty.sercurity.handler;

import com.google.gson.Gson;
import com.green.smarty.dto.SecurityUserDTO;
import com.green.smarty.sercurity.util.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

public class APILoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        System.out.println("----------------------------------");
        System.out.println(authentication);
        System.out.println("----------------------------------");

        // getClaims()를 통하여 JSON 데이터 구성
        SecurityUserDTO securityUserDTO = (SecurityUserDTO)authentication.getPrincipal();
        Map<String, Object> claims = securityUserDTO.getClaims();

        String accessToken = JWTUtil.generateToken(claims, 10);
        String refreshToken = JWTUtil.generateToken(claims, 60*24);

        claims.put("accessToken", accessToken);
        claims.put("refreshToken", refreshToken);

        // 정상적 로그인 -> JSON 결과를 만들어 전송
        Gson gson = new Gson();
        String jsonStr = gson.toJson(claims);
        response.setContentType("application/json; charset=UTF-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.println(jsonStr);
        printWriter.close();
    }
}
