package com.dakim.collegeevent.controller;

import com.dakim.collegeevent.model.RSO;
import com.dakim.collegeevent.repository.RSORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/getByAdmin")
    public List<RSO> getByAdmin(@RequestParam String admin)   {
        return rsoRepository.getByAdmin(admin);
    }

    @PostMapping("/addMember")
    public void addRsoMembers(@RequestBody Map<String, String> rsoMemberForm)   {
        rsoRepository.addRSOMembers(rsoMemberForm.get("rso"), rsoMemberForm.get("rsoMember"));
    }
}
