package com.example.memories.model;

import com.example.memories.entity.UsersEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRecents {
    private Long searchId;
    private String keyword;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private UsersEntity user;
}
