package com.example.memories.repository.repositoryJPA;

import com.example.memories.entity.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<RolesEntity,Long> {
    Optional<RolesEntity> findByRoleName(String roleName);
}