package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Conversation is not found")
public class ConversationtNotFoundException extends Exception{
    public ConversationtNotFoundException(String message){
        super(message);
    }
}
