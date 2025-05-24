package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.validation.annotation.Validated;

@SpringBootApplication
@Validated
public class Start {
    public static  void main(String[] args) {
        SpringApplication.run(Start.class, args);
    }
}
