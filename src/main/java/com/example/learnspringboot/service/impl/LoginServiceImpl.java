package com.example.learnspringboot.service.impl;

import com.example.learnspringboot.entity.UserEntity;
import com.example.learnspringboot.mapper.UserMapper;
import com.example.learnspringboot.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    UserMapper userMapper;

    @Override
    public Map login(String username, String password) {
        UserEntity userEntity = userMapper.getOne(username);
        System.out.println(userEntity.getId()+"==="+userEntity.getUserName());
        return null;
    }

    @Override
    public void addCustomer(String username) {
        UserEntity ue = new UserEntity();
        ue.setUserName(username);
        userMapper.addCustomer(ue);
    }


}
