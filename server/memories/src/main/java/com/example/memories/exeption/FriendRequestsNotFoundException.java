package com.example.memories.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Friend Requests not found")
public class FriendRequestsNotFoundException extends Exception{
    public FriendRequestsNotFoundException(String message) {
        super(message);
    }
}
