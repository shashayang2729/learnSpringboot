package com.example.learnspringboot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.learnspringboot.mapper")
public class LearnspringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearnspringbootApplication.class, args);
    }

}
