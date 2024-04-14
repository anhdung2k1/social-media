package com.example.memories.config;

import com.example.memories.entity.CommentsEntity;
import com.example.memories.entity.ConversationEntity;
import com.example.memories.entity.MessageEntity;
import com.example.memories.entity.NotificationsEntity;
import com.example.memories.model.Comments;
import com.example.memories.model.Conversation;
import com.example.memories.model.Messages;
import com.example.memories.model.Notifications;
import com.example.memories.repository.repositoryJPA.*;
import org.springframework.beans.BeanUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class KafkaListeners {
    private final RedisTemplate<String, String> redisTemplate;
    private final CommentsRepository commentsRepository;
    private final NotificationsRepository notificationsRepository;
    private final UsersRepository usersRepository;
    private final PostsRepository postsRepository;
    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;

    public KafkaListeners(RedisTemplate<String,String> redisTemplate, CommentsRepository commentsRepository, NotificationsRepository notificationsRepository,PostsRepository postsRepository, UsersRepository usersRepository,MessageRepository messageRepository,RoomRepository roomRepository){
        this.redisTemplate = redisTemplate;
        this.commentsRepository =commentsRepository;
        this.notificationsRepository = notificationsRepository;
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
    }
    @KafkaListener(
            topics = "notifications",
            groupId = "notifications_groupId"
    )
    public void notificationsListener(String data){
        System.out.println("Listener Notification Receive: " + data);
        String[] listKeysNotification = new String[]{"notiType","post","user"};
        String[] listData = data.split(",");
        HashMap<String, String> map = new HashMap<>();
        for(int i = 0;i<listData.length;i++){
            map.put(listKeysNotification[i],listData[i]);
        }
        map.forEach((k,v)->System.out.println("Key : " + k + " Value : " + v));
        NotificationsEntity notificationsEntity = new NotificationsEntity();
        Notifications notifications = new Notifications(
                Long.valueOf(map.get("notiType")),
                postsRepository.findById(Long.valueOf(map.get("post"))).isPresent() ? postsRepository.findById(Long.valueOf(map.get("post"))).get() : null,
                usersRepository.findById(Long.valueOf(map.get("user"))).isPresent() ? usersRepository.findById(Long.valueOf(map.get("user"))).get() : null
        );
        BeanUtils.copyProperties(notifications,notificationsEntity);
        notificationsRepository.save(notificationsEntity);
    }
    @KafkaListener(
            topics = "messages",
            groupId = "messages_groupId"
    )
    public void messagesListener(String data){
        redisTemplate.convertAndSend("messages", data);
        System.out.println("Listener Message Receive: " + data);
        String[] listKeysMessage = new String[]{"message","sender", "room"};
        String[] listData = data.split(",");
        HashMap<String, String> map = new HashMap<>();
        for(int i = 0;i<listData.length;i++){
            map.put(listKeysMessage[i],listData[i]);
        }
        map.forEach((k,v)->System.out.println("Key : " + k + " Value : " + v));
        MessageEntity messageEntity = new MessageEntity();
        Messages messages = new Messages(
                map.get("message"),
                usersRepository.findById(Long.valueOf(map.get("sender"))).isPresent() ?   usersRepository.findById(Long.valueOf(map.get("sender"))).get() : null,
                roomRepository.findById(Long.valueOf(map.get("room"))).isPresent() ? roomRepository.findById(Long.valueOf(map.get("room"))).get() : null
        );
        BeanUtils.copyProperties(messages,messageEntity);
        messageRepository.save(messageEntity);
    }
    @KafkaListener(
            topics = "comments",
            groupId = "comments_groupId"
    )
    public void commentsListener(String data){
        String[] listKeysComments = new String[]{"cmtContent","userId","replyTo","postId"};
        String[] listData = data.split(",");
        HashMap<String, String> map = new HashMap<>();
        for(int i = 0;i<listData.length;i++){
            map.put(listKeysComments[i],listData[i]);
        }
        map.forEach((k,v)->System.out.println("Key : " + k + " Value : " + v));
        CommentsEntity commentsEntity = new CommentsEntity();
        Comments comments = new Comments(
                map.get("cmtContent"),
                usersRepository.findById(Long.valueOf(map.get("userId"))).isPresent() ? usersRepository.findById(Long.valueOf(map.get("userId"))).get() : null,
                Long.valueOf(map.get("replyTo")),
                postsRepository.findById(Long.valueOf(map.get("postId"))).isPresent() ? postsRepository.findById(Long.valueOf(map.get("postId"))).get() : null
        );
        BeanUtils.copyProperties(comments,commentsEntity);
        commentsRepository.save(commentsEntity);
    }
    ///sendUser receiveUser messages
    @KafkaListener(
            topics = "room",
            groupId = "room_groupId"
    )
    public void roomListener(String data){
        String[] listKeysRoom = new String[]{"sendUser","receiveUser"};
        String[] listData = data.split(",");
        HashMap<String, String> map = new HashMap<>();
        for(int i = 0;i<listData.length;i++){
            map.put(listKeysRoom[i],listData[i]);
        }
        map.forEach((k,v)->System.out.println("Key : " + k + " Value : " + v));
        ConversationEntity conversationEntity = new ConversationEntity();
        Conversation conversation = new Conversation(
                usersRepository.findById(Long.valueOf(map.get("sendUser"))).isPresent() ? usersRepository.findById(Long.valueOf(map.get("sendUser"))).get() : null,
                usersRepository.findById(Long.valueOf(map.get("receiveUser"))).isPresent() ? usersRepository.findById(Long.valueOf(map.get("receiveUser"))).get() : null
        );
        BeanUtils.copyProperties(conversation,conversationEntity);
        roomRepository.save(conversationEntity);
    }
}
