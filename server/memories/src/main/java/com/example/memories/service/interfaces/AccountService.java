package com.example.memories.service.interfaces;

import com.example.memories.builder.AuthenticationResponse;
import com.example.memories.entity.RolesEntity;
import com.example.memories.exeption.AccountNotFoundException;
import com.example.memories.model.Accounts;

import java.util.List;

public interface AccountService {
    AuthenticationResponse createAccount(Accounts account) throws Exception; //Done
    AuthenticationResponse authenticate(Accounts account) throws AccountNotFoundException;
    List<Accounts> getAllAccounts();
    boolean deleteAccount(Long id) throws AccountNotFoundException;
    Accounts getAccountById(Long id);
    Accounts updateAccount(Long id, Accounts account) throws AccountNotFoundException;
    boolean softDeleteAccount(Long id);
    boolean recoverAccount(Long id);
    List<Accounts> getAllAccountsByRoleId(Long roleId);
    List<Accounts> getRecentAccountRegister();
    Long countAllByRoles(Long roleId);
}
