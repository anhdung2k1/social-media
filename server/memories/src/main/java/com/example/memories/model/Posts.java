package com.example.memories.model;

import com.example.memories.entity.PhotoInPostEntity;
import com.example.memories.entity.UsersEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Posts {
    private Long postId;

    private String content;

    private String permission;

    private UsersEntity user;
    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private int isArchieved;

    private PhotoInPostEntity photoInPost;
}
