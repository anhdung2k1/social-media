package com.example.memories.controller;
import com.example.memories.entity.ReactionsEntity;
import com.example.memories.exeption.InvalidRequestException;
import com.example.memories.exeption.ReactionsNotFoundException;
import com.example.memories.model.Reactions;
import com.example.memories.service.interfaces.ReactionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ReactionsController {
    @Autowired
    ReactionService reactionService;
    @GetMapping("/reactions")
    public ResponseEntity<List<Reactions>> getAllReactions(){
        List<Reactions> reactionsList = reactionService.getAllReactions();
        return ResponseEntity.ok().body(reactionsList);
    }
    @GetMapping("/reactions/{id}")
    public ResponseEntity<Reactions> getReactionById(@PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1")Long id) throws ReactionsNotFoundException {
        return ResponseEntity.ok().body(reactionService.getReactionById(id));
    }
    @GetMapping("/post/{postId}/reactions")
    public ResponseEntity<List<Reactions>> getReactionByPostId(@PathVariable Long postId ){
        List<Reactions> reactionsList = reactionService.getAllReactionsByPostId(postId);
        return ResponseEntity.ok().body(reactionsList);
    }
    @GetMapping("/comment/{commentId}/reactions")
    public ResponseEntity<List<Reactions>> getReactionByCommentId(@PathVariable Long commentId){
        return ResponseEntity.ok().body(reactionService.getAllReactionsByCommentId(commentId));
    }
    @PostMapping("/user/{userId}/reactions")
    public ResponseEntity<Object> createReaction(@PathVariable Long userId, @Valid @RequestBody Reactions reactions, BindingResult result) throws Exception{
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validaion error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(reactionService.createReaction(userId,reactions));
    }
    @PutMapping("/reactions/{id}")
    public ResponseEntity<Object> updateReaction(@PathVariable Long id,@Valid @RequestBody Reactions reactions, BindingResult result) throws ReactionsNotFoundException {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validaion error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(reactionService.updateReaction(id,reactions));
    }
    @DeleteMapping("/reactions/post/{postId}/user/{userId}")
    public ResponseEntity<Boolean> deleteReaction(@PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1") Long postId,
                                                  @PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1") Long userId) throws ReactionsNotFoundException{
        return ResponseEntity.ok().body(reactionService.deleteReaction(postId, userId));
    }
}
