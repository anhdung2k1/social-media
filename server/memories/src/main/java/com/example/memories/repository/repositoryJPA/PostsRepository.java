package com.example.memories.repository.repositoryJPA;
import com.example.memories.entity.PostsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface PostsRepository extends JpaRepository<PostsEntity, Long> {

    @Query("SELECT COUNT(1) FROM PostsEntity")
    Long countAllPosts();

    @Query("SELECT COUNT(1) FROM PostsEntity WHERE createAt BETWEEN TO_DATE(:startDate, 'yyyy-mm') AND TO_DATE(:endDate, 'yyyy-mm')")
    Long countPostsByMonth(@Param("startDate")String startDate, @Param("endDate") String endDate);
}
