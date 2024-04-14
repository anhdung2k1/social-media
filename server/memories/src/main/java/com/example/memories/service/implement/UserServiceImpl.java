package com.example.memories.service.implement;

import com.example.memories.entity.UsersEntity;
import com.example.memories.exeption.UserNotFoundException;
import com.example.memories.model.Users;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
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
public class UserServiceImpl implements UserService {
    private final UsersRepository usersRepository;
    @Override
    public Users createUser(Users user) {
        //Create new role entity
        UsersEntity usersEntity = new UsersEntity();
        //Copy all the properties RoleEntity assigned to Role model
        user.setFollower(0L);
        user.setCreateAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        BeanUtils.copyProperties(user, usersEntity);
        usersRepository.save(usersEntity);
        return user;
    }

    @Override
    public List<Users> getAllUsers() {
        //Get all list of USERS with Spring Data JPA query
        // Select * from USERS;
        List<UsersEntity> usersEntities = usersRepository.findAll();
        //Get all the USERS
        return usersEntities.
                stream()
                .map(us -> new Users(
                        us.getUser_id(),
                        us.getUserName(),
                        us.getBirth_day(),
                        us.getAddress(),
                        us.getRelationship(),
                        us.getGender(),
                        us.getFollower(),
                        us.getAvatar_url(),
                        us.getCover_url(),
                        us.getCreateAt(),
                        us.getUpdateAt()
                )).collect(Collectors.toList());
    }

    @Override
    public boolean deleteUser(Long id) throws UserNotFoundException{
        try {
            UsersEntity user = usersRepository.findById(id).isPresent() ? usersRepository.findById(id).get() : null;
            //DELETE FROM USERS
            assert user != null;
            usersRepository.delete(user);
            return true;
        }
        catch (NoSuchElementException e){
            throw new UserNotFoundException("User is not found :%d" + id.toString());
        }
    }

    @Override
    public Users getUserById(Long id) throws UserNotFoundException {
        try {
            UsersEntity usersEntity = usersRepository.findById(id).isPresent() ? usersRepository.findById(id).get() : null;
            Users users = new Users();
            // Assign all the properties USERProperties to users
            assert usersEntity != null;
            BeanUtils.copyProperties(usersEntity, users);
            return users;
        }
        catch (NoSuchElementException e){
            throw new UserNotFoundException("User is not found :%d" + id.toString());
        }
    }

    @Override
    public Users updateUser(Long id, Users user) throws UserNotFoundException {
        try {
            UsersEntity usersEntity = usersRepository.findById(id).isPresent() ? usersRepository.findById(id).get() : null;
            assert usersEntity != null;
            usersEntity.setUserName(user.getUserName());
            usersEntity.setBirth_day(user.getBirth_day());
            usersEntity.setAddress(user.getAddress());
            usersEntity.setRelationship(user.getRelationship());
            usersEntity.setFollower(user.getFollower());
            usersEntity.setGender(user.getGender());
            usersEntity.setCover_url(user.getCover_url());
            usersEntity.setAvatar_url(user.getAvatar_url());
            usersEntity.setUpdateAt(LocalDateTime.now());
            usersRepository.save(usersEntity);
            return user;
        }
        catch (NoSuchElementException e){
            throw new UserNotFoundException("User is not found :%d" + id.toString());
        }
    }

    @Override
    public Users updateFollowerUser(Long id, Users user) throws UserNotFoundException {
        try {
            UsersEntity usersEntity = usersRepository.findById(id).isPresent() ? usersRepository.findById(id).get() : null;
            assert usersEntity != null;
            usersEntity.setFollower(user.getFollower() + 1);
            usersEntity.setUpdateAt(LocalDateTime.now());
            usersRepository.save(usersEntity);
            return user;
        }
        catch (NoSuchElementException e){
            throw new UserNotFoundException("User is not found :%d" + id.toString());
        }
    }
}
