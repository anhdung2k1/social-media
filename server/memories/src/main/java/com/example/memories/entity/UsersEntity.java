package com.example.memories.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

/*
    @author Anh Dung
 */
@Setter
@Getter
@Entity
@Table(name = "USERS")
public class UsersEntity {

    // Default constructor
    public UsersEntity(){}
    public UsersEntity(String userName){
        // Constructor with parameters
        this.userName = userName;
        this.follower = 0L;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID",nullable = false)
    private Long user_id;
    @Column(name = "USER_NAME", nullable = false)
    private String userName;
    @Temporal(TemporalType.DATE)
    @Column(name = "BIRTHDAY")
    private Date birth_day;

    @Column(name = "ADDRESS")
    private String address;


    @Column(name = "RELATIONSHIP")
    private String relationship;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "FOLLOWER")
    private Long follower;

    @Column(name = "COVER_URL")
    private String cover_url;

    @Column(name = "AVATAR_URL")
    private String avatar_url;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_At")
    private LocalDateTime updateAt;
}
