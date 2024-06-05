package com.example.memories.controller;
import com.example.memories.exeption.InvalidRequestException;
import com.example.memories.exeption.SearchRecentNotFoundException;
import com.example.memories.model.SearchRecents;
import com.example.memories.service.interfaces.SearchRecentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://ec2-54-210-169-183.compute-1.amazonaws.com:3000" , "http://54.210.169.183:3000")
@RequestMapping("/api")
public class SearchRecentsController {
    @Autowired
    SearchRecentService searchRecentService;
    @GetMapping("/searchrecents")
    public ResponseEntity<List<SearchRecents>> getAllSearchRecents(){
        @Valid List<SearchRecents> searchRecentsList = searchRecentService.getAllSearch();
        return ResponseEntity.ok().body(searchRecentsList);
    }
    @GetMapping("/user/{userId}/searchrecents")
    public ResponseEntity<List<SearchRecents>> getAllSearchRecentsByUserId(@PathVariable Long userId){
        return ResponseEntity.ok().body(searchRecentService.getAllSearchByUserId(userId));
    }
    @GetMapping("/searchrecents/{id}")
    public ResponseEntity<SearchRecents> getSearchRecentById(@PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1") Long id) throws SearchRecentNotFoundException {
        return ResponseEntity.ok().body(searchRecentService.getSearchById(id));
    }
    @PostMapping("/user/{userId}/searchrecents")
    public ResponseEntity<Object> createSearch(@PathVariable Long userId, @Valid @RequestBody SearchRecents searchRecents, BindingResult result) throws Exception
    {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validation error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(searchRecentService.createSearch(userId, searchRecents));
    }
    @PutMapping("/user/{userId}/searchrecents")
    public ResponseEntity<Object> updateSearch(@PathVariable Long userId,@Valid @RequestBody SearchRecents searchRecents, BindingResult result) throws SearchRecentNotFoundException{
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validaion error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(searchRecentService.updateSearch(userId,searchRecents));
    }
    @DeleteMapping("/searchrecents/{id}")
    public ResponseEntity<Boolean> deleteSearch(@PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1") Long id) throws SearchRecentNotFoundException
    {
        return ResponseEntity.ok().body(searchRecentService.deleteSearchRecents(id));
    }
}
