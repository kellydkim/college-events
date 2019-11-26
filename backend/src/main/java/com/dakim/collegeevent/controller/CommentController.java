package com.dakim.collegeevent.controller;

import com.dakim.collegeevent.model.Comment;
import com.dakim.collegeevent.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("comment")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/getAll")
    public List<Comment> getAll() {
        return commentRepository.findAll();
    }

}
