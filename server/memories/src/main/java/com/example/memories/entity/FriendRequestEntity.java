package com.example.memories.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="FRIENDREQUEST")
public class FriendRequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REQ_ID", nullable = false)
    private Long reqId;

    @ManyToOne
    @JoinColumn(name = "SEND_USER_ID")
    private UsersEntity sendUser;

    @ManyToOne
    @JoinColumn(name = "RECEIVE_USER_ID")
    private UsersEntity receiveUser;

    @Column(name = "IS_ACCEPTED")
    private int isAccepted;
    @Column(name = "IS_ARCHIEVED")
    private int isArchived;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_At")
    private LocalDateTime updateAt;
}
