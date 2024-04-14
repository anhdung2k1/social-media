package com.example.memories.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "POSTS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POST_ID", nullable = false)
    private Long postId;

    @Column(name="POST_CONTENT", nullable = false)
    private String content;

    @Column(name="PERMISSION")
    private String permission;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="USER_ID")
    private UsersEntity user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "PHOTO_ID")
    private PhotoInPostEntity photoInPost;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT")
    @PastOrPresent(message = "Create Date must be past or present")
    private LocalDateTime createAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_AT")
    @PastOrPresent(message = "Update Date must be past or present")
    private LocalDateTime updateAt;

    @Column(name = "IS_ARCHIEVED")
    private int isArchieved;
}