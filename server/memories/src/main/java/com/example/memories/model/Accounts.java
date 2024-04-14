package com.example.memories.model;

import com.example.memories.entity.RolesEntity;
import com.example.memories.entity.UsersEntity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/*
    @author Anh Dung
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accounts {
    private Long acc_id;
    private String userName;
    private String hashPassword;
    private Long phone_number;
    private String email;
    private int isArchieved;
    private RolesEntity roles;
    private UsersEntity users;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
