package com.example.memories.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "NOTIFICATIONS")
public class NotificationsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTI_ID", nullable = false)
    @TableGenerator(name = "NOTIFICAITON_GEN",
            table = "SEQUENCER",
            pkColumnName = "SEQ_NAME",
            valueColumnName = "SEQ_COUNT",
            pkColumnValue = "NOTI_SEQ_NEXT_VAL",
            allocationSize = 1
    )
    private Long notiId;

    @Column(name = "IS_SEEN", nullable = false)
    private Integer isSeen;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT" )
    @PastOrPresent(message = "Create Date must be past or present")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_AT")
    @PastOrPresent(message = "Update Date must be past or present")
    private LocalDateTime updateAt;
    @Column(name = "NOTI_TYPE")
    private Long notiType;
    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private UsersEntity user;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private PostsEntity post;

    @Column(name = "IS_POPULAR")
    private Integer isPopular;
}
