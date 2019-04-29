package com.example.learnspringboot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserControler {
    @RequestMapping("/welcome")
    public String login(){
        return "welcome";
    }
}
