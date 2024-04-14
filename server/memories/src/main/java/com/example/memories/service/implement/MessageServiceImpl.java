package com.example.memories.service.implement;

import com.example.memories.entity.MessageEntity;
import com.example.memories.exeption.MessageNotFoundException;
import com.example.memories.model.Messages;
import com.example.memories.repository.repositoryJPA.MessageRepository;
import com.example.memories.repository.repositoryJPA.RoomRepository;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.MessageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    @Override
    public List<Messages> getAllRoomMessage(long roomId) {
        List<MessageEntity> messageEntities = messageRepository.findAllByCreateAt().isPresent() ? messageRepository.findAllByCreateAt().get() : null;
        assert messageEntities != null;
        return messageEntities.stream()
                .filter(message -> message.getConversation().getConvID() == roomId)
                .map(
                message -> new Messages(
                        message.getId(),
                        message.getMessage(),
                        message.getSender(),
                        message.getConversation(),
                        message.getCreateAt()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public Messages createMessage(long userId,long roomId, Messages messages) throws Exception{
        try {
            MessageEntity newMessages = new MessageEntity();
            messages.setMessage(messages.getMessage());
            messages.setCreateAt(LocalDateTime.now());
            if(usersRepository.findById(userId).isPresent()){
                messages.setSender(usersRepository.findById(userId).get());
            }
            if(roomRepository.findById(roomId).isPresent()){
                messages.setConversation(roomRepository.findById(roomId).get());
            }
            kafkaTemplate.send("messages", messages.getMessage() +","+userId + "," + roomId);
            return messages;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Messages updateMessage(long messageId, Messages messages) throws MessageNotFoundException {
        try {
            MessageEntity messageEntity = messageRepository.findById(messageId).isPresent() ? messageRepository.findById(messageId).get() : null;
            assert messageEntity != null;
            messageEntity.setMessage(messages.getMessage());
            messageRepository.save(messageEntity);
            return messages;
        }
        catch (NoSuchElementException e){
            throw new MessageNotFoundException(String.format("Could not found any Message with ID %s", messageId));
        }
    }

    @Override
    public Boolean deleteMessage(long messageId) throws MessageNotFoundException {
        try {
            messageRepository.deleteById(messageId);
            return true;
        }
        catch (NoSuchElementException e){
            throw new MessageNotFoundException(String.format("Could not found any Message with ID %s", messageId));
        }
    }
}
