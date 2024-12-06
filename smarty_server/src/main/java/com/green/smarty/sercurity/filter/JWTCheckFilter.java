package com.green.smarty.sercurity.filter;

import com.google.gson.Gson;
import com.green.smarty.dto.SecurityUserDTO;
import com.green.smarty.vo.UserVO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import com.green.smarty.sercurity.util.JWTUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        if(request.getMethod().equals("OPTIONS")) {
            // Preflight 요청은 체크하지 않음
            return true;
        }
        String path = request.getRequestURI();
        System.out.println("URI 확인 : " + path);

        if(path.startsWith("/api/auth/") || path.startsWith("/api/user/") || path.startsWith("/api/product/")) {
            // 체크하지않을 경로, 이후 조정 필요
            return true;
        }
        return false;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        System.out.println("---------------JWT CHECK FILTER----------------");
        String authHeaderStr = request.getHeader("Authorization");
        try {
            // Access Token 확인
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            System.out.println("JWT Claims : " + claims);
            filterChain.doFilter(request, response);    // 통과

            // JWT 인증 정보를 활용하여 사용자를 구성하고 이를 시큐리티에 지정
            String id = (String) claims.get("id");
            String pw = (String) claims.get("pw");
            String email = (String) claims.get("email");
            String level = (String) claims.get("level");

            // UserVO 객체 생성
            UserVO userVO = new UserVO();
            userVO.setUser_id(id);
            userVO.setPassword(pw);
            userVO.setEmail(email);
            userVO.setLevel(level);

            // SecurityUserDTO 생성
            SecurityUserDTO securityUserDTO = new SecurityUserDTO(userVO);

            // Authentication객체 생성
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    securityUserDTO,
                    null,   // 자격 증명이 필요 없음, 이미 인증된 사용자임
                    securityUserDTO.getAuthorities()
            );
            // SecurityContext에 인증 정보 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            System.out.println("JWT Check Error 발생");
            System.out.println(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }

    }
}
