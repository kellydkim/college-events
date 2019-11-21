package com.dakim.collegeevent.controller;

        import com.dakim.collegeevent.model.University;
        import com.dakim.collegeevent.repository.UniversityRepository;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/university")
public class UniversityController {
    @Autowired
    UniversityRepository universityRepository;

    @GetMapping("/getByName")
    public University getByName(@RequestParam String name) {
        return universityRepository.getByName(name);
    }
    @GetMapping("/getAll")
    public List<University> getAll() {
        return universityRepository.findAll();
    }

    @PostMapping("/add")
    public University post(@RequestBody University university)  {
        return universityRepository.save(university);
    }

}
