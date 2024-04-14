package com.example.memories.model;

import com.example.memories.entity.PostsEntity;
import com.example.memories.entity.UsersEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comments {
    public Comments(String cmtContent, UsersEntity user, Long replyTo, PostsEntity post){
        this.cmtContent = cmtContent;
        this.users = user;
        this.replyTo = replyTo;
        this.post = post;
        this.isArchieved = 0;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }
    private Long cmtId;
    private String cmtContent;
    private UsersEntity users;
    private Long replyTo;
    private PostsEntity post;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private int isArchieved;
}

