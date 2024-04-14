package com.example.memories.model;

import com.example.memories.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reactions {
    private Long reactId;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private PostsEntity post;
    private UsersEntity userId;
    private CommentsEntity cmtId;
}
