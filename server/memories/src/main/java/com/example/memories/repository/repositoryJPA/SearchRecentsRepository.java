package com.example.memories.repository.repositoryJPA;
import com.example.memories.entity.SearchRecentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchRecentsRepository extends JpaRepository<SearchRecentsEntity, Long> {
}
