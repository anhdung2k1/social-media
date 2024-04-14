package com.example.memories.exeption;

import org.springframework.validation.BindingResult;

public class InvalidRequestException extends RuntimeException {
    private BindingResult result;

    public InvalidRequestException(String message, BindingResult result) {
        super(message);
        this.result = result;
    }

    public BindingResult getResult() {
        return result;
    }
}
