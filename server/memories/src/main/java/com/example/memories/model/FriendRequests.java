package com.example.memories.model;

import com.example.memories.entity.UsersEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequests {
    private Long reqId;
    private UsersEntity sendUser;
    private UsersEntity receiveUser;
    private int isAccepted;
    private int isArchived;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
