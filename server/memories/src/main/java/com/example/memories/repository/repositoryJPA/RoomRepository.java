package com.example.memories.repository.repositoryJPA;

import com.example.memories.entity.ConversationEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<ConversationEntity,Long> {
    @Query(value = "SELECT r FROM ConversationEntity r WHERE r.sendUser.user_id = :sendUserId")
    Optional<List<ConversationEntity>> findBySendUser(@Param("sendUserId")Long sendUserId);
}
