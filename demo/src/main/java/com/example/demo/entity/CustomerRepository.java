package com.example.demo.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {

    //通过年龄查询  方法名不能乱写
    List<Customer>  findByAge(int age);
}
