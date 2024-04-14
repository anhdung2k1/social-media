package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
    @author Anh Dung
 */
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Profile is not found")
public class ProfileNotFound extends Exception{
    public ProfileNotFound(String message){
        super(message);
    }
}
