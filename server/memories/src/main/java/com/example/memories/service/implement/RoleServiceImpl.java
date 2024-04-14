package com.example.memories.service.implement;

import com.example.memories.entity.RolesEntity;
import com.example.memories.exeption.RoleNotFoundException;
import com.example.memories.model.Roles;
import com.example.memories.repository.repositoryJPA.RolesRepository;
import com.example.memories.service.interfaces.RoleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

/*
    @author Anh Dung
 */
@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    //Constructor
    @Autowired
    private RolesRepository rolesRepository;
    @Override
    public Roles createRole(Roles role) throws Exception {
        try {
            RolesEntity roleEntity = new RolesEntity();
            role.setCreateAt(LocalDateTime.now());
            role.setUpdatedAt(LocalDateTime.now());
            //Copy all the properties RoleEntity assigned to Role model
            BeanUtils.copyProperties(role, roleEntity);
            rolesRepository.save(roleEntity);
            return role;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
    @Override
    public List<Roles> getAllRoles() {
        List<RolesEntity> rolesEntities = rolesRepository.findAll();
        //Get all the roles
        return rolesEntities.
                stream()
                .map(rol -> new Roles(
                        rol.getRole_id(),
                        rol.getRoleName(),
                        rol.getCreateAt(),
                        rol.getUpdateAt()
                )).collect(Collectors.toList());
    }

    @Override
    public boolean deleteRole(Long id) throws RoleNotFoundException {
        try {
            RolesEntity role = rolesRepository.findById(id).isPresent() ? rolesRepository.findById(id).get() : null;
            assert role != null;
            rolesRepository.delete(role);
            return true;
        }catch (NoSuchElementException e){
            throw new RoleNotFoundException(String.format("Could not found any post with Id %s", id));
        }
    }

    @Override
    public Roles getRoleById(Long id) throws RoleNotFoundException {
        try {
            RolesEntity rolesEntity = rolesRepository.findById(id).isPresent() ? rolesRepository.findById(id).get() : null;
            Roles roles = new Roles();
            // Assign all the properties roleEntity to roles
            assert rolesEntity != null;
            BeanUtils.copyProperties(rolesEntity, roles);
            return roles;
        }
        catch (NoSuchElementException e)
        {
            throw new RoleNotFoundException(String.format("Could not found any post with Id %s", id));
        }
    }

    @Override
    public Roles updateRole(Long id, Roles role) throws RoleNotFoundException {
        try {
            RolesEntity rolesEntity = rolesRepository.findById(id).get();
            rolesEntity.setRoleName(role.getRoleName());
            rolesEntity.setUpdateAt(LocalDateTime.now());

            rolesRepository.save(rolesEntity);
            return role;
        }
        catch (NoSuchElementException e){
            throw new RoleNotFoundException(String.format("Could not found any post with Id %s", id));
        }
    }
}
