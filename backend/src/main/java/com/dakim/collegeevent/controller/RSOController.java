package com.dakim.collegeevent.controller;

import com.dakim.collegeevent.model.RSO;
import com.dakim.collegeevent.repository.RSORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/rso")
public class RSOController {
    @Autowired
    RSORepository rsoRepository;

    @GetMapping("/getByName")
    public RSO getByName(@RequestParam String name) {
        return rsoRepository.getByName(name);
    }

    @GetMapping("/getAll")
    public List<RSO> getAll() {
        return rsoRepository.findAll();
    }

    @PostMapping("/add")
    public RSO post(@Valid @RequestBody RSO rso) {
        return rsoRepository.save(rso);
    }
}
