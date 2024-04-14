package com.example.memories.model;

import com.example.memories.entity.ConversationEntity;
import com.example.memories.entity.UsersEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Messages {
    public Messages(String message, UsersEntity sender, ConversationEntity conversation){
        this.message = message;
        this.sender = sender;
        this.conversation = conversation;
        this.createAt = LocalDateTime.now();
    }
    private Long id;
    private String message;
    private UsersEntity sender;
    private ConversationEntity conversation;
    private LocalDateTime createAt;
}
