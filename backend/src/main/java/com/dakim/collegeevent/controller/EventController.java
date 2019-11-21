package com.dakim.collegeevent.controller;

import com.dakim.collegeevent.model.Contact;
import com.dakim.collegeevent.model.Event;
import com.dakim.collegeevent.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("event")
public class EventController {
    @Autowired
    EventRepository eventRepository;

    @GetMapping("/getUpcoming")
    public List<Event> getUpcoming() {
        return eventRepository.getUpcoming();
    }

    @GetMapping("/getAll")
    public List<Event> getAll() {
        return eventRepository.findAll(Sort.by(Sort.Direction.ASC, "start"));
    }

    @PostMapping("/add")
    public Event post(@Valid @RequestBody Event event) {
        return eventRepository.save(event);
    }
}
