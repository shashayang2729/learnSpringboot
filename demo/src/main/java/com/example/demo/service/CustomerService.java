package com.example.demo.service;

import com.example.demo.entity.Customer;
import com.example.demo.entity.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Transactional
    public void insertTwo(){
        Customer t1 = new Customer();
        //t1.setName("小红");
        t1.setName("x");
        t1.setAge(18);
        customerRepository.save(t1);
int i = 100/0;
        Customer t2 = new Customer();
        t2.setAge(20);
        //t2.setName("小明");
        t2.setName("xiaoming");
        customerRepository.save(t2);
    }
}
