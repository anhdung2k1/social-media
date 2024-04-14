package com.example.memories.repository.repositoryJPA;
import com.example.memories.entity.CommentsEntity;
import com.example.memories.entity.PostsEntity;
import com.example.memories.entity.ReactionsEntity;
import com.example.memories.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionsEntity,Long>{
    Optional<ReactionsEntity> findAllByPost(PostsEntity posts);
    @Query("SELECT r from ReactionsEntity r WHERE r.post.postId = :postId AND r.userId.user_id = :userId ")
    Optional<ReactionsEntity> findByPostIdAndUserId(@Param("postId") Long postId, @Param("userId")Long userId);
}

