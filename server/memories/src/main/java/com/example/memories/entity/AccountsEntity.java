package com.example.memories.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;


import java.io.Serializable;
import java.time.LocalDateTime;

/*
    @author Anh Dung
 */
@Entity
@Setter
@Getter
@Table(name = "ACCOUNTS")
@Transactional(rollbackOn = Exception.class)
public class AccountsEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACC_ID", nullable = false,unique = true)
    @TableGenerator(name = "ACCOUNT_GEN",
                    table = "SEQUENCER",
                    pkColumnName = "SEQ_NAME",
                    valueColumnName = "SEQ_COUNT",
                    pkColumnValue = "USER_SEQ_NEXT_VAL",
                    allocationSize = 1
    )
    private Long acc_id;

    @Column(name = "USER_NAME", nullable = false, length = 255)
    @NotBlank(message = "UserName must not be blank")
    @Size(min = 3, message = "User name must at least 3 characters")
    private String userName;

    @Column(name = "HASH_PASS", nullable = false, length = 64)
    @NotBlank(message = "Password must not be blank")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @JsonIgnore
    private String hashPassword;

    @Column(name = "PHONE_NUM")
    private Long phone_number;

    @Column(name = "EMAIL", nullable = false, length = 128)
    @NotBlank(message = "Email must not be blank")
    @Email(message = "Please provide a valid email address")
    private String email;

    @Column(name = "IS_ARCHIEVED", nullable = false)
    private int isArchieved;

    //MappyBy trỏ tới biến accounts ở trong roles
    @ManyToOne
    @JoinColumn(name = "ROLE_ID")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private RolesEntity roles;

    @OneToOne //Đánh dấu quan hệ 1-1 với User
    @JoinColumn(name = "USER_ID") // Liên kết với nhau qua khóa ngoại USER_ID
    private UsersEntity users;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_AT")
    private LocalDateTime updateAt;
}
