package com.dakim.collegeevent.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.dakim.collegeevent.model.User;
import com.dakim.collegeevent.repository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    class Login {
        String username;
        String password;
    }

    @Autowired
    UserRespository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @GetMapping("/getByUsername")
    public User getByUsername(@RequestParam String name) {
        return userRepository.getByUsername(name);
    }

    @GetMapping("/getById")
    public User getById(@RequestParam int id) {
        return userRepository.getById(id);
    }

    @GetMapping("/getAll")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PostMapping("/add")
    public User post(@Valid @RequestBody User user) {
        System.out.println(user.getPassword());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User validUser = userRepository.getByUsername(user.getUsername());
        if (bCryptPasswordEncoder.matches(user.getPassword(), validUser.getPassword())) {
            return validUser;
        }
        return null;
    }
}
