package com.example.learnspringboot.mapper;

import com.example.learnspringboot.entity.UserEntity;

import java.util.List;

public interface UserMapper {
    List<UserEntity> getAll();
    UserEntity getOne(String username);
}
