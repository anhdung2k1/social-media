package com.example.memories.controller;

import com.example.memories.exeption.PhotoNotFoundException;
import com.example.memories.model.PhotoInPosts;
import com.example.memories.service.interfaces.PhotoInPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class PhotoInPostController {
    @Autowired
    PhotoInPostService photoInPostService;
    @GetMapping("/user/{userId}/photoinposts")
    public ResponseEntity<List<Map<String, Object>>> getAllPhotoByUserId(@PathVariable("userId") Long userId){
        return ResponseEntity.ok().body(photoInPostService.getAllPhotoByUserId(userId));
    }
    @GetMapping("/photoinposts/{id}")
    public ResponseEntity<Map<String, Object>> getPhotoById(@PathVariable("id") Long id) throws PhotoNotFoundException{
        return ResponseEntity.ok().body(photoInPostService.getPhotoById(id));
    }
    @PatchMapping("/photoinposts/{id}")
    public ResponseEntity<Object> updatePhoto(@PathVariable Long id, @RequestParam(value="image") String file) throws PhotoNotFoundException {
        return ResponseEntity.ok().body(photoInPostService.updatePhoto(id, file));
    }
    @PostMapping(value = "/user/{userId}/photoinposts", consumes={ MediaType.MULTIPART_FORM_DATA_VALUE }, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PhotoInPosts> createPhotoInPosts(@RequestParam(value = "image") String file, @PathVariable("userId") Long userId) throws IOException {
        return ResponseEntity.ok().body(photoInPostService.createPhotoInPost(file, userId));
    }
    @DeleteMapping("/photoinposts/{id}")
    public ResponseEntity<Boolean> deletePhoto(@PathVariable Long id) throws PhotoNotFoundException {
        return ResponseEntity.ok().body(photoInPostService.deletePhotoInPost(id));
    }
}
