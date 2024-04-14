package com.example.memories.service.interfaces;

import com.example.memories.exeption.RoleNotFoundException;
import com.example.memories.model.Accounts;
import com.example.memories.model.Roles;

import java.util.List;

public interface RoleService {
    Roles createRole(Roles role) throws Exception;
    List<Roles> getAllRoles();

    boolean deleteRole(Long id) throws RoleNotFoundException;
    Roles getRoleById(Long id) throws RoleNotFoundException;
    Roles updateRole(Long id, Roles role) throws RoleNotFoundException;
}
