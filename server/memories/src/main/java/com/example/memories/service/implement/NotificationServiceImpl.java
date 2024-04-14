package com.example.memories.service.implement;

import com.example.memories.entity.NotificationsEntity;
import com.example.memories.exeption.NotificationNotFoundException;
import com.example.memories.model.Notifications;
import com.example.memories.repository.repositoryJPA.NotificationsRepository;
import com.example.memories.repository.repositoryJPA.PostsRepository;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;


@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private final UsersRepository usersRepository;
    @Autowired
    private final NotificationsRepository notificationsRepository;
    @Autowired
    private final PostsRepository postsRepository;
    @Override
    public List<Notifications> getAllNotification() {
        List<NotificationsEntity> notificationsEntities = notificationsRepository.findAll();
        return notificationsEntities.stream().map(
                notification -> new Notifications(
                        notification.getNotiId(),
                        notification.getIsSeen(),
                        notification.getCreateAt(),
                        notification.getUpdateAt(),
                        notification.getNotiType(),
                        notification.getIsPopular(),
                        notification.getUser(),
                        notification.getPost()
                )
        ).collect(Collectors.toList());
    }
    @Override
    public List<Notifications> getAllNotiByUserId(long userId){
            List<NotificationsEntity> notificationsEntities = notificationsRepository.findAll();
            return notificationsEntities.stream().
                    filter(notificationsEntity -> notificationsEntity.getUser().getUser_id() == userId).
                    map(
                            notificationsEntity -> new Notifications(
                                    notificationsEntity.getNotiId(),
                                    notificationsEntity.getIsSeen(),
                                    notificationsEntity.getCreateAt(),
                                    notificationsEntity.getUpdateAt(),
                                    notificationsEntity.getNotiType(),
                                    notificationsEntity.getIsPopular(),
                                    notificationsEntity.getUser(),
                                    notificationsEntity.getPost()
                            )
                    ).collect(Collectors.toList());
    }

    @Override
    public Notifications createNotification(long userId, Notifications notification) throws Exception {
        try {
            NotificationsEntity newNotification = new NotificationsEntity();
            if(notificationsRepository.findByPost(notification.getPost().getPostId()).isPresent() && notificationsRepository.findByUser(notification.getUser()).isPresent()){
                throw new Exception("Cannot create notification twice");
            }
            notification.setCreateAt(LocalDateTime.now());
            notification.setUpdateAt(LocalDateTime.now());
            if (usersRepository.findById(userId).isPresent()) {
                notification.setUser(usersRepository.findById(userId).get());
            }
            BeanUtils.copyProperties(notification, newNotification);
            notificationsRepository.save(newNotification);
            return notification;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Notifications updateNotification(long id, Notifications notification) throws NotificationNotFoundException{
       if (notificationsRepository.findById(id).isPresent()){
           NotificationsEntity newNotification = notificationsRepository.findById(id).get();
           newNotification.setUpdateAt(LocalDateTime.now());
           newNotification.setNotiId(notification.getNotiType());
           notificationsRepository.save(newNotification);
           Notifications updateNotification = new Notifications();
           BeanUtils.copyProperties(newNotification, updateNotification);
           return updateNotification;
       }
       else {
           throw new NotificationNotFoundException(String.format("Could not found any notification with id %s", id));
       }
    }

    @Override
    public Notifications getNotificationById(long id) throws NotificationNotFoundException{
        try {
            NotificationsEntity notificationsEntity = notificationsRepository.findById(id).isPresent() ? notificationsRepository.findById(id).get() : null;
            Notifications notification = new Notifications();
            assert notificationsEntity != null;
            BeanUtils.copyProperties(notificationsEntity, notification);
            return notification;
        }
        catch (NoSuchElementException e){
            throw new NotificationNotFoundException(String.format("Could not found any notification with id %s", id));
        }
    }

    @Override
    public Boolean deleteNotificationById(long id) throws NotificationNotFoundException {
        try {
            notificationsRepository.deleteById(id);
            return true;
        }
        catch(NoSuchElementException e){
            throw new NotificationNotFoundException(String.format("Notification is not found with id %s", id));
        }
    }
}
