package com.example.memories.controller;

import com.example.memories.exeption.CommentNotFoundException;
import com.example.memories.model.Comments;
import com.example.memories.service.interfaces.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://ec2-54-210-169-183.compute-1.amazonaws.com:3000" , "http://54.210.169.183:3000")
@RequestMapping("/api")
public class CommentsController {
    @Autowired
    private CommentService commentService;
    @GetMapping("/post/{postId}/comments")
    public ResponseEntity<List<Comments>> getAllCommentsPost(@PathVariable Long postId){
        return ResponseEntity.ok().body(commentService.getAllCommentsPost(postId));
    }
    @GetMapping("/comments/{id}")
    public ResponseEntity<Comments> getCommentById(@PathVariable Long id){
        return ResponseEntity.ok().body(commentService.getCommentById(id));
    }
    @PostMapping("/user/{userId}/comments/{postId}")
    public ResponseEntity<Comments> createComment(@PathVariable Long postId,@PathVariable Long userId, @RequestBody Comments comments) throws Exception {
        return ResponseEntity.ok().body(commentService.createComment(postId,userId,comments));
    }
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Boolean> deleteComment(@PathVariable Long id) throws CommentNotFoundException {
        return ResponseEntity.ok().body(commentService.deleteComment(id));
    }
    @PutMapping("/comments/{id}")
    public ResponseEntity<Comments> updateComment(@PathVariable Long id,@RequestBody Comments comments) throws CommentNotFoundException {
        return ResponseEntity.ok().body(commentService.updateComment(id,comments));
    }
}

