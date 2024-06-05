package com.example.memories.controller;

import com.example.memories.exeption.ConversationtNotFoundException;
import com.example.memories.exeption.MessageNotFoundException;
import com.example.memories.model.Conversation;
import com.example.memories.model.Messages;
import com.example.memories.service.interfaces.ConversationService;
import com.example.memories.service.interfaces.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://ec2-54-210-169-183.compute-1.amazonaws.com:3000" , "http://54.210.169.183:3000")
@RequestMapping("/api")
public class ConversationController {
    @Autowired
    private ConversationService conversationService;

    @GetMapping("/sendUser/{sendUserId}/room")
    public ResponseEntity<List<Conversation>> getAllRoom(@PathVariable Long sendUserId) {
        @Valid List<Conversation> conversations = conversationService.getAllRoom(sendUserId);
        return ResponseEntity.ok().body(conversations);
    }
    @GetMapping("/room/{id}")
    public ResponseEntity<Conversation> getRoom(@PathVariable Long id) throws ConversationtNotFoundException {
        @Valid Conversation conversation = conversationService.getRoom(id);
        return ResponseEntity.ok().body(conversation);
    }
    @PostMapping("/user/{userId}/room")
    public ResponseEntity<Object> createRoom(@PathVariable Long userId, @Valid @RequestBody Conversation conversation, BindingResult result) throws Exception
    {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validaion error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(conversationService.createRoom(userId, conversation));
    }
    @DeleteMapping("/room/{id}")
    public ResponseEntity<Boolean> deleteRoom(@PathVariable Long id) throws ConversationtNotFoundException{
        return ResponseEntity.ok().body(conversationService.deleteRoom(id));
    }
}
