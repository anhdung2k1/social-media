package com.example.memories.repository.repositoryJPA;
import com.example.memories.entity.PhotoInPostEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoInPostRepository extends JpaRepository<PhotoInPostEntity, Long> {
    @Query(value = "SELECT p.* FROM photoinposts p WHERE p.user_id =:userId", nativeQuery = true)
    List<PhotoInPostEntity> findAllPhotosByUserId(Long userId);
}
