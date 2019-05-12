package com.example.demo.controller;


import com.example.demo.service.CustomerService;
import com.example.demo.entity.Customer;
import com.example.demo.entity.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerService customerService;

    @GetMapping(value="/customerList")
    public List<Customer> getList(){
       return customerRepository.findAll();
    }

    @PostMapping(value="/addCustomer")
    public Customer addCustomer(@RequestParam("name") String name,@RequestParam("age") int age){
        Customer  customer = new Customer();
        customer.setAge(age);
        customer.setName(name);
        customerRepository.save(customer);
        return customer;
    }

    @GetMapping(value="/getCustomer/{id}")
    public Customer getOne(@PathVariable("id") Integer id){
//            return customerRepository.getOne(id);
        return customerRepository.findById(id).get();
    }

    //更改
    @PutMapping(value="/updateCustomer/{id}")
    public Customer updateCustomer(@PathVariable("id") Integer id,String name,Integer age){
        Customer t = new Customer();
        t.setName(name);
        t.setId(id);
        t.setAge(age);
        return customerRepository.save(t);
    }
    //删除
   // PathVariable都必须要加
    @DeleteMapping(value="/deleteCustomer/{id}")
    public void delCustomer(@PathVariable Integer id){
       // Customer t = customerRepository.getOne(id);
        customerRepository.deleteById(id);
    }

    //通过年龄查询
    @GetMapping(value="/get/age/{age}")
    List<Customer> getByAge(@PathVariable int age){
        return customerRepository.findByAge(age);
    }

    @PostMapping(value="/customer/insert/two")
    public void testTransaction(){
        customerService.insertTwo();
    }
}
