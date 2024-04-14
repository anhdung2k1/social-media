package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Notification not found")
public class NotificationNotFoundException extends Exception {
    public NotificationNotFoundException(String message) {
        super(message);
    }
}
