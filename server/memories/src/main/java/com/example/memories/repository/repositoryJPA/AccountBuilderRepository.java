package com.example.memories.repository.repositoryJPA;

import com.example.memories.builder.AccountBuilder;
import com.example.memories.entity.AccountsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountBuilderRepository extends JpaRepository<AccountBuilder,Long> {
    Optional<AccountBuilder> findByEmail(String email);
}
