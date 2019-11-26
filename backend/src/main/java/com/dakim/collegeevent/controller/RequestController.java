package com.dakim.collegeevent.controller;

import com.dakim.collegeevent.model.Request;
import com.dakim.collegeevent.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("request")
public class RequestController {
    @Autowired
    RequestRepository requestRepository;

    @GetMapping("/getAll")
    public List<Request> getAll() {
        return requestRepository.findAll();
    }

    @PostMapping("/add")
    public Request post(@Valid @RequestBody Request request) {
        return requestRepository.save(request);
    }

    @DeleteMapping("/deleteById")
    public void deleteById(@RequestParam Integer id)    {
        requestRepository.deleteById(id);
    }
}
