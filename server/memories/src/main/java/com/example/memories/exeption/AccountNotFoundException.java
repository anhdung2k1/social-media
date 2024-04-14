package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Account is not found")
public class AccountNotFoundException extends Exception{
    public AccountNotFoundException(String message){
        super(message);
    }
}
