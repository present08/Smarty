package com.green.smarty.sercurity.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

public class JWTUtil {

    private static String key = "egyyumnyjoyghkeojunosnauumoonuhugsnyejnha";

    // JWT 문자열 생성
    public static String generateToken(Map<String, Object> valueMap, int min) {

        SecretKey key = null;

        try {
            key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        String jwtStr = Jwts.builder()
                .setHeader(Map.of("typ", "JWT"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(key)
                .compact();

        return jwtStr;
    }

    // 검증
    public static Map<String, Object> validateToken(String token) {

        Map<String, Object> claim = null;

        try {
            SecretKey key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
            claim = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (MalformedJwtException malformedJwtException) {
            throw new CustomJWTException("JWT 형식이 잘못되었습니다.");
        } catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException("토큰이 만료되었습니다");
        } catch (InvalidClaimException invalidClaimException) {
            throw new CustomJWTException("클레임 값이 잘못되었습니다.");
        } catch (JwtException jwtException) {
            throw new CustomJWTException("JWT 파싱 중 예기치 않은 오류 발생");
        } catch (Exception e) {
            throw new CustomJWTException("예기치 않은 오류 발생");
        }

        return claim;
    }
}
