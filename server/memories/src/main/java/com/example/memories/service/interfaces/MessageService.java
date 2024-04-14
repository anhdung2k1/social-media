package com.example.memories.service.interfaces;

import com.example.memories.exeption.MessageNotFoundException;
import com.example.memories.model.Messages;

import java.util.List;

public interface MessageService {
    List<Messages> getAllRoomMessage(long roomId);
    Messages createMessage(long userId,long roomId,Messages messages) throws Exception;
    Messages updateMessage(long messageId, Messages messages) throws MessageNotFoundException;
    Boolean deleteMessage(long messageId) throws MessageNotFoundException;
}
