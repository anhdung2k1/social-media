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
public class Notifications {
    public Notifications(Long notiType, PostsEntity post, UsersEntity user){
        this.notiType = notiType;
        this.post = post;
        this.user = user;
        this.isSeen = 0;
        this.isPopular = 0;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }
    private Long notificationId;
    private Integer isSeen;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Long notiType;
    private Integer isPopular;
    private UsersEntity user;
    private PostsEntity post;
}
