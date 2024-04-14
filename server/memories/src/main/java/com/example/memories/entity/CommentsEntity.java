package com.example.memories.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "COMMENTS")
public class CommentsEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CMT_ID", nullable = false, unique = true)
    @TableGenerator(name = "COMMENT_GEN",
                    table = "SEQUENCER",
                    pkColumnName = "SEQ_NAME",
                    valueColumnName = "SEQ_COUNT",
                    pkColumnValue = "COMMENT_SEQ_NEXT_VAL",
                    allocationSize = 1
    )
    private Long cmtId;

    @Column(name = "CMT_CONTENT", nullable = false, length = 255)
    private String cmtContent;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID")
    private UsersEntity users;

    @Column(name = "REPLY_TO")
    private Long replyTo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "POST_ID")
    private PostsEntity post;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT",nullable = true)
    private LocalDateTime createAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_AT")
    private LocalDateTime updateAt;

    @Column(name = "IS_ARCHIEVED", nullable = false)
    private int isArchieved;

}
