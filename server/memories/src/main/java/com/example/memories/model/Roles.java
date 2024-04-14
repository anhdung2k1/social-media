package com.example.memories.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

/*
    @author Anh Dung
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Roles {
    private Long role_id;
    private String roleName;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;
}
