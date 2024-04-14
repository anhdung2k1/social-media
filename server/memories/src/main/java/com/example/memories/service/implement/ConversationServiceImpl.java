package com.example.memories.service.implement;

import com.example.memories.entity.ConversationEntity;
import com.example.memories.exeption.ConversationtNotFoundException;
import com.example.memories.model.Conversation;
import com.example.memories.repository.repositoryJPA.RoomRepository;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.ConversationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class ConversationServiceImpl implements ConversationService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public List<Conversation> getAllRoom(long sendUserId) {
        List<ConversationEntity> listRoomEntities = roomRepository.findBySendUser(sendUserId).isPresent() ? roomRepository.findBySendUser(sendUserId).get() : null;
        assert listRoomEntities != null;
        return listRoomEntities.stream()
                .map(room -> new Conversation(
                        room.getConvID(),
                        room.getSendUser(),
                        room.getReceiveUser(),
                        room.getCreateAt()
                )).toList();
    }

    @Override
    public Conversation getRoom(long id) throws ConversationtNotFoundException {
        try {
            ConversationEntity conversationEntity = roomRepository.findById(id).isPresent() ? roomRepository.findById(id).get() : null;
            Conversation conversation = new Conversation();
            assert conversationEntity != null;
            BeanUtils.copyProperties(conversationEntity, conversation);
            return conversation;
        }
        catch (NoSuchElementException e){
            throw new ConversationtNotFoundException(String.format("Could not found any Room within Id %s", id));
        }
    }

    @Override
    public Conversation createRoom(long userId, Conversation conversation) throws Exception {
        try {
            if (usersRepository.findById(userId).isPresent()) {
                conversation.setSendUser(usersRepository.findById(userId).get());
            }
            if (conversation.getReceiveUser() != null) {
                conversation.setReceiveUser(usersRepository.findById(conversation.getReceiveUser().getUser_id()).isPresent()
                        ? usersRepository.findById(conversation.getReceiveUser().getUser_id()).get() : null
                );
            }
            conversation.setCreateAt(LocalDateTime.now());
            //sendUser receiveUser messages
            kafkaTemplate.send("room", userId + "," + conversation.getReceiveUser().getUser_id());
            return conversation;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Boolean deleteRoom(long id) throws ConversationtNotFoundException {
        try {
            return null;
        }
        catch (NoSuchElementException e){
            throw new ConversationtNotFoundException(String.format("Could not found any Room within id %s", id));
        }
    }
}
