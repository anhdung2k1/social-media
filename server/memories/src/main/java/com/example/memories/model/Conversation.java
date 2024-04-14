package com.example.memories.model;

import com.example.memories.entity.MessageEntity;
import com.example.memories.entity.UsersEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    public Conversation(UsersEntity sendUser, UsersEntity receiveUser) {
        this.sendUser = sendUser;
        this.receiveUser = receiveUser;
        this.createAt = LocalDateTime.now();
    }
    private Long convId;
    private UsersEntity sendUser;
    private UsersEntity receiveUser;
    private LocalDateTime createAt;
}
