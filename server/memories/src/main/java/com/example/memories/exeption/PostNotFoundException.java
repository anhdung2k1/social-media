package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
    @author Anh Dung
 */
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Post not found")
public class PostNotFoundException extends Exception{
    public PostNotFoundException(String message) {
        super(message);
    }
}
