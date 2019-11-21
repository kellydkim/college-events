package com.dakim.collegeevent.controller;

import com.dakim.collegeevent.model.Contact;
import com.dakim.collegeevent.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contact")
public class ContactController {
    @Autowired
    ContactRepository contactRepository;

    @PostMapping("/add")
    public Contact post(@RequestBody Contact contact)   {
        return contactRepository.save(contact);
    }

    @GetMapping("/getByEmail")
    public Contact getByEmail(@RequestParam String email) {
        return contactRepository.getByEmail(email);
    }

    @GetMapping("/getAll")
    public List<Contact> getAll() {
        return contactRepository.findAll();
    }
}
