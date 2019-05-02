package com.example.learnspringboot.service;

import java.util.Map;

public interface LoginService {
     Map login(String username, String password);
     void addCustomer(String username);
}
