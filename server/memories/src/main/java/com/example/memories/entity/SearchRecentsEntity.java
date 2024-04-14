package com.example.memories.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
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
@Table(name = "SEARCHRECENTS")
public class SearchRecentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEARCH_ID", nullable = false)
    @TableGenerator(
            name = "SEARCHRECENT_GEN",
            table = "SEQUENCER",
            pkColumnName = "SEQ_NAME",
            valueColumnName = "SEQ_COUNT",
            pkColumnValue = "SEARCH_SEQ_NEXT_VAL"
    )
    private Long searchId;
    @Column(name = "KEYWORD", nullable = false)
    @NotBlank(message = "Key work must not be blank")
    private String keyword;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT")
    @PastOrPresent(message = "Create Date must be past or present")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_AT")
    @PastOrPresent(message = "Update Date must be past or present")
    private LocalDateTime updateAt;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_ID")
    private UsersEntity user;
}
