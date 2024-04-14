package com.example.memories.service.interfaces;

import com.example.memories.exeption.ConversationtNotFoundException;
import com.example.memories.model.Conversation;

import java.util.List;

public interface ConversationService {
    List<Conversation> getAllRoom(long sendUserId);
    Conversation getRoom(long id) throws ConversationtNotFoundException;
    Conversation createRoom(long userId, Conversation conversation) throws Exception;
    Boolean deleteRoom(long id) throws ConversationtNotFoundException;
}
