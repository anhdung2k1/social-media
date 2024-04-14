package com.example.memories.repository.repositoryJPA;

import com.example.memories.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    @Query("SELECT m FROM MessageEntity m ORDER BY m.createAt ASC")
    Optional<List<MessageEntity>> findAllByCreateAt();
}
