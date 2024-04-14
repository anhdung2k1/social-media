package com.example.memories.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/*
    @author Anh Dung
 */

@Entity
@Setter
@Getter
@Table(name = "ACC_ROLES")
public class RolesEntity {
    public RolesEntity() {}
    public RolesEntity(String roleName){
        this.roleName = roleName;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROLE_ID", nullable = false)
    @TableGenerator(
            name = "ROLE_GEN",
            table = "SEQUENCER",
            pkColumnName = "SEQ_NAME",
            valueColumnName = "SEQ_COUNT",
            pkColumnValue = "ROLE_SEQ_NEXT_VAL",
            allocationSize = 1
    )
    private Long role_id;

    @Column(name = "ROLE_NAME", nullable = false)
    @NotBlank(message = "Rolename must not be blank")
    private String roleName;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT")
    @PastOrPresent(message = "Create Date must be past or present")
    private LocalDateTime createAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_AT")
    @PastOrPresent(message = "Update Date must be past or present")
    private LocalDateTime updateAt;

}
