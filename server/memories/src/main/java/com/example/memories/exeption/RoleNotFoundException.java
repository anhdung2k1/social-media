package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Role is not found")
public class RoleNotFoundException extends Exception{
    public RoleNotFoundException(String message){
        super(message);
    }
}
