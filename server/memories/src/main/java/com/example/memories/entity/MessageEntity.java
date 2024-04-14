package com.example.memories.entity;

import com.example.memories.model.Messages;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chat_message")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESS_ID",nullable = false,unique = true)
    private Long id;
    @Column(name = "MESSAGE",nullable = false)
    private String message;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SENDER_ID", nullable = false)
    private UsersEntity sender;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private ConversationEntity conversation;
    @Column(name = "CREATE_AT")
    private LocalDateTime createAt;
}
