package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Search Recent is not found")
public class SearchRecentNotFoundException extends Exception{
    public SearchRecentNotFoundException(String message){
        super(message);
    }
}
