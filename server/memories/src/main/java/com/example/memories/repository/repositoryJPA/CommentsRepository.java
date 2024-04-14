package com.example.memories.repository.repositoryJPA;
import com.example.memories.entity.CommentsEntity;
import com.example.memories.entity.PostsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<CommentsEntity,Long> {
    List<CommentsEntity> findAllByPost(PostsEntity post);
}

