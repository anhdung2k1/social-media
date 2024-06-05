package com.example.memories.controller;

import com.example.memories.exeption.UserNotFoundException;
import com.example.memories.model.Roles;
import com.example.memories.model.Users;
import com.example.memories.service.interfaces.RoleService;
import com.example.memories.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
/*
    @author Anh Dung
 */
@CrossOrigin(origins = "http://ec2-54-210-169-183.compute-1.amazonaws.com:3000" , "http://54.210.169.183:3000")
@RestController
@RequestMapping("/api")
public class UsersController {
    @Autowired
    private final UserService userService;

    public UsersController(UserService userService){
        this.userService = userService;
    }
    @PostMapping("/users")
    public ResponseEntity<Users> createUser(@RequestBody Users user){
        return ResponseEntity.ok(userService.createUser(user));
    }
    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable Long id) throws UserNotFoundException {
        boolean deleted = userService.deleteUser(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Long id) throws UserNotFoundException {
        Users user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users user) throws UserNotFoundException {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }
    @PutMapping("/users/{id}/follower")
    public ResponseEntity<Users> updateFollowerUser(@PathVariable Long id, @RequestBody Users user) throws UserNotFoundException {
        return ResponseEntity.ok(userService.updateFollowerUser(id,user));
    }
}
