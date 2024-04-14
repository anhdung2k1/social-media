package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Reactions not found")
public class ReactionsNotFoundException extends Exception {
    public ReactionsNotFoundException(String message){
        super(message);
    }
}
