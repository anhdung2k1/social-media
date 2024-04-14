package com.example.memories.service.interfaces;

import com.example.memories.exeption.UserNotFoundException;
import com.example.memories.model.Roles;
import com.example.memories.model.Users;

import java.util.List;

public interface UserService {
    Users createUser(Users user);

    List<Users> getAllUsers();

    boolean deleteUser(Long id) throws UserNotFoundException;
    Users getUserById(Long id) throws UserNotFoundException;

    Users updateUser(Long id, Users users) throws UserNotFoundException;
    Users updateFollowerUser(Long id, Users users) throws  UserNotFoundException;
}
