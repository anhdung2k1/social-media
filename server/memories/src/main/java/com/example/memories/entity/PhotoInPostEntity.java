package com.example.memories.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Setter
@Getter
@Table(name = "PHOTOINPOSTS")
public class PhotoInPostEntity {
    public PhotoInPostEntity() {}
    public PhotoInPostEntity(String photoUrl){
        this.photoUrl = photoUrl;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PHOTO_ID",nullable = false)
    @TableGenerator(
            name = "PHOTOINPOST_GEN",
            table = "SEQUENCER",
            pkColumnName = "SEQ_NAME",
            valueColumnName = "SEQ_COUNT",
            pkColumnValue = "PHOTO_SEQ_NEXT_VAL",
            allocationSize = 1
    )
    private Long photoId;

    @Column(name="IS_HIGHLIGHT")
    private Integer isHighlight;

    @Column(name = "PHOTO_URL")
    @NotBlank(message = "PhotoUrl must not be blank")
    private String photoUrl;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "CREATE_AT", nullable = true)
    @PastOrPresent(message = "Create Date must be past or present")
    private LocalDateTime createAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "UPDATE_AT", nullable = true)
    @PastOrPresent(message = "Update Date must be past or present")
    private LocalDateTime updateAt;

}
