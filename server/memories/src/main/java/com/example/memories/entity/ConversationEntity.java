package com.example.memories.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CONVERSATION")
public class ConversationEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CONV_ID", nullable = false, unique = true)
    @TableGenerator(name = "CONVERSATION",
            table = "SEQUENCER",
            pkColumnName = "SEQ_NAME",
            valueColumnName = "SEQ_COUNT",
            pkColumnValue = "CONVERSATION_SEQ_NEXT_VAL",
            allocationSize = 1
    )
    private Long convID;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SEND_USER_ID")
    private UsersEntity sendUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RECEIVE_USER_ID")
    private UsersEntity receiveUser;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT",nullable = true)
    private LocalDateTime createAt;
}
