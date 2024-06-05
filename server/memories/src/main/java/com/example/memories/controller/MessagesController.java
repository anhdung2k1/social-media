package com.example.memories.controller;

import com.example.memories.exeption.MessageNotFoundException;
import com.example.memories.exeption.NotificationNotFoundException;
import com.example.memories.model.Messages;
import com.example.memories.model.Notifications;
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
public class MessagesController {
    @Autowired
    private MessageService messageService;
    @GetMapping("/room/{roomId}/messages")
    public ResponseEntity<List<Messages>> getAllRoomMessage(@PathVariable Long roomId){
        @Valid List<Messages> messagesList = messageService.getAllRoomMessage(roomId);
        return ResponseEntity.ok().body(messagesList);
    }
    @PostMapping("/user/{userId}/room/{roomId}/messages")
    public ResponseEntity<Object> createMessage(@PathVariable Long userId, @PathVariable Long roomId, @Valid @RequestBody Messages messages, BindingResult result) throws Exception
    {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validaion error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(messageService.createMessage(userId,roomId, messages));
    }
    @PutMapping("/messages/{id}")
    public ResponseEntity<Object> updateMessage(@PathVariable Long id, @Valid @RequestBody Messages messages, BindingResult result) throws MessageNotFoundException {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation error: " + result.getAllErrors());
        }
        Messages updatedMessage = messageService.updateMessage(id, messages);
        return ResponseEntity.ok(updatedMessage);
    }
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Object> deleteMessage(@PathVariable Long id) throws MessageNotFoundException{
        return ResponseEntity.ok().body(messageService.deleteMessage(id));
    }
}
