package com.green.smarty;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.green.smarty.mapper")
public class SmartyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartyApplication.class, args);
	}

}
