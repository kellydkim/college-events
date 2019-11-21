package com.dakim.collegeevent.controller;

import com.dakim.collegeevent.model.RSO;
import com.dakim.collegeevent.repository.RSORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rso")
public class RSOController {
    @Autowired
    RSORepository rsoRepository;

    @GetMapping("/getByName")
    public RSO getIdByName(@RequestParam String name) {
        return rsoRepository.getByName(name);
    }

    @GetMapping("/getAll")
    public List<RSO> getAll() {
        return rsoRepository.findAll();
    }

}
