package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Photo is not found")
public class PhotoNotFoundException extends Exception{
    public PhotoNotFoundException(String message){
        super(message);
    }
}
