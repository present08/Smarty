package com.green.smarty.sercurity.util;

public class CustomJWTException extends RuntimeException{
    // JWT 예외 처리

    public CustomJWTException(String msg) {
        super(msg);
    }
}
