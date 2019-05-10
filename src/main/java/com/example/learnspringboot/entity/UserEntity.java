package com.example.learnspringboot.entity;

import org.apache.ibatis.type.Alias;

//这个注解可加可不加
@Alias("userEntity")
public class UserEntity {
    private Integer id;
    private String userName;
    private Integer age;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
