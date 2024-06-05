package com.example.memories.controller;
import com.example.memories.exeption.InvalidRequestException;
import com.example.memories.exeption.NotificationNotFoundException;
import com.example.memories.model.Notifications;
import com.example.memories.service.interfaces.NotificationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://ec2-54-210-169-183.compute-1.amazonaws.com:3000" , "http://54.210.169.183:3000")
@RequestMapping("/api")
public class NotificationsController {
    @Autowired
    NotificationService notificationService;
    @GetMapping("/notifications")
    public ResponseEntity<List<Notifications>>getAllNotification(){
        @Valid List<Notifications> notificationsList = notificationService.getAllNotification();
        return ResponseEntity.ok().body(notificationsList);
    }
    @GetMapping("/notifications/{id}")
    public ResponseEntity<Notifications> getNotificationById(@PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1") Long id) throws NotificationNotFoundException {
        Notifications notification = notificationService.getNotificationById(id);
        return ResponseEntity.ok().body(notification);
    }
    @GetMapping("/user/{userId}/notifications")
    public ResponseEntity<List<Notifications>> getNotificationByUserId(@PathVariable Long userId)
    {
        @Valid List<Notifications> notificationsList = notificationService.getAllNotiByUserId(userId);
        return ResponseEntity.ok().body(notificationsList);
    }
    @PutMapping("/notifications/{id}")
    public ResponseEntity<Object> updateNotification(@PathVariable Long id, @Valid @RequestBody Notifications notification, BindingResult result) throws NotificationNotFoundException{
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation error: " + result.getAllErrors());
        }
        Notifications updatedNotification = notificationService.updateNotification(id, notification);
        return ResponseEntity.ok(updatedNotification);
    }
    @PostMapping("/user/{userId}/notifications")
    public ResponseEntity<Object> createNotification(@PathVariable Long userId, @Valid @RequestBody Notifications notification, BindingResult result) throws Exception
    {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validaion error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(notificationService.createNotification(userId, notification));
    }
    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<Object> deleteNotification(@PathVariable Long id) throws NotificationNotFoundException{
        return ResponseEntity.ok().body(notificationService.deleteNotificationById(id));
    }
}
