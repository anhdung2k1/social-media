package com.example.memories.controller;
import com.example.memories.builder.PostResponse;
import com.example.memories.constant.SpringBootApplicationConstant;
import com.example.memories.exeption.PostNotFoundException;
import com.example.memories.model.Posts;
import com.example.memories.service.interfaces.PostService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://ec2-54-210-169-183.compute-1.amazonaws.com:3000" , "http://54.210.169.183:3000")
@RequestMapping("/api")
public class PostController {
    private static final Pattern SORT_DIRECTION_PATTERN = Pattern.compile("(asc|desc)", Pattern.CASE_INSENSITIVE);

    @Autowired
    PostService postService;
    @GetMapping("/posts")
    public ResponseEntity<Object> getAllPosts(
            @RequestParam(value = "keyword",defaultValue = SpringBootApplicationConstant.DEFAULT_PAGE_KEYWORD,required = false) String keyword,
            @RequestParam(value = "pageNo", defaultValue = SpringBootApplicationConstant.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = SpringBootApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = SpringBootApplicationConstant.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = SpringBootApplicationConstant.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ) {
        // Validate the page number
        if (pageNo <= 0) {
            return ResponseEntity.badRequest().body("Page number must be greater than 0");
        }
        // Validate the page size
        if (pageSize < 0) {
            return ResponseEntity.badRequest().body("Page size must be greater or equal than 0");
        }
        // Validate the sort direction
        if (!StringUtils.isEmpty(sortDir) && !SORT_DIRECTION_PATTERN.matcher(sortDir).matches()) {
            return ResponseEntity.badRequest().body("Sort direction must be 'asc' or 'desc'");
        }
        // Validate the response
        PostResponse posts =  postService.getAllPosts(pageNo, pageSize, sortBy, sortDir, keyword);
        if (posts == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No posts found");
        }
        return ResponseEntity.ok().body(posts);
    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<List<Posts>> getPostByUserId(@PathVariable Long userId){
        @Valid List<Posts> postsList = postService.getPostByUserId(userId);
        return ResponseEntity.ok().body(postsList);
    }
    @GetMapping("/posts/{id}")
    public ResponseEntity<Posts> getPostById(@PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1") Long id) throws PostNotFoundException {
        return ResponseEntity.ok().body(postService.getPostById(id));
    }
    @PostMapping("/{userId}/posts")
    public ResponseEntity<Object> createPost(@PathVariable Long userId,@Valid @RequestBody Posts post, BindingResult result) throws Exception{
        if  (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validation error: "+result.getAllErrors());
        }
        return ResponseEntity.ok().body(postService.createPost(userId, post));
    }
    @PutMapping("/posts/{id}")
    public ResponseEntity<Object> updatePost(@PathVariable Long id, @Valid @RequestBody Posts post, BindingResult result) throws PostNotFoundException {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validation error: " + result.getAllErrors());
        }
        return ResponseEntity.ok().body(postService.updatePost(id, post));
    }
    @PutMapping("/posts/{id}/audience")
    public ResponseEntity<Object> updateAudiencePost(@PathVariable Long id, @Valid @RequestBody Posts post, BindingResult result) throws PostNotFoundException{
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body("Validtion error: "+result.getAllErrors());
        }
        return ResponseEntity.ok().body(postService.updateAudiencePost(id,post));
    }
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Boolean> deletePost(@PathVariable @Min(value = 1, message = "Id must be greater than or equal to 1") Long id) throws PostNotFoundException {
        return ResponseEntity.ok().body(postService.deletePostById(id));
    }

}
