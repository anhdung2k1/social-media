package com.example.memories.service.implement;

import com.example.memories.entity.ReactionsEntity;
import com.example.memories.exeption.ReactionsNotFoundException;
import com.example.memories.model.Reactions;
import com.example.memories.repository.repositoryJPA.CommentsRepository;
import com.example.memories.repository.repositoryJPA.PostsRepository;
import com.example.memories.repository.repositoryJPA.ReactionRepository;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.ReactionService;
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
public class ReactionServiceImpl implements ReactionService {
    @Autowired
    private ReactionRepository reactionRepository;
    @Autowired
    private PostsRepository postsRepository;
    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Override
    public Reactions createReaction(Long userId,Reactions reactions) throws Exception {
        try {
            ReactionsEntity reactionsEntity = new ReactionsEntity();
            reactions.setCreateAt(LocalDateTime.now());
            reactions.setUpdateAt(LocalDateTime.now());
            reactions.setUserId(usersRepository.findById(userId).isPresent() ? usersRepository.findById(userId).get() : null);
            BeanUtils.copyProperties(reactions,reactionsEntity);
            reactionRepository.save(reactionsEntity);
            return reactions;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<Reactions> getAllReactions() {
        List<ReactionsEntity> reactionsEntities = reactionRepository.findAll();
        return reactionsEntities.stream().map(
                react -> new Reactions(
                        react.getReactId(),
                        react.getCreateAt(),
                        react.getUpdateAt(),
                        react.getPost(),
                        react.getUserId(),
                        react.getCmtId()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public List<Reactions> getAllReactionsByPostId(Long postId) {
            List<ReactionsEntity> reactionsEntities = reactionRepository.findAll();
            return reactionsEntities.stream()
                    .filter(react -> react.getPost().getPostId().equals(postId))
                    .map(
                            react -> new Reactions(
                                    react.getReactId(),
                                    react.getCreateAt(),
                                    react.getUpdateAt(),
                                    react.getPost(),
                                    react.getUserId(),
                                    react.getCmtId()
                            )
                    ).collect(Collectors.toList());
    }

    @Override
    public List<Reactions> getAllReactionsByCommentId(Long commentId){
            List<ReactionsEntity> reactionsEntities = reactionRepository.findAll();
            return reactionsEntities.stream()
                    .filter(react -> react.getCmtId().getCmtId().equals(commentId))
                    .map(
                            react -> new Reactions(
                                    react.getReactId(),
                                    react.getCreateAt(),
                                    react.getUpdateAt(),
                                    react.getPost(),
                                    react.getUserId(),
                                    react.getCmtId()
                            )
                    ).collect(Collectors.toList());
    }

    @Override
    public Reactions getReactionById(Long id) throws ReactionsNotFoundException {
        try {
            ReactionsEntity reactionsEntity = reactionRepository.findById(id).get();
            Reactions reactions = new Reactions();
            BeanUtils.copyProperties(reactionsEntity,reactions);
            return reactions;
        }
        catch (NoSuchElementException e){
            throw new ReactionsNotFoundException(String.format("Could not found any reaction with id %s", id));
        }
    }

    @Override
    public Reactions updateReaction(Long id, Reactions reactions) throws ReactionsNotFoundException {
        try {
            ReactionsEntity reactionsEntity = reactionRepository.findById(id).get();
            reactionsEntity.setUpdateAt(LocalDateTime.now());
            reactionRepository.save(reactionsEntity);
            return reactions;
        }
        catch (NoSuchElementException e){
            throw new ReactionsNotFoundException(String.format("Could not found any reaction with id %s", id));
        }
    }

    @Override
    public Boolean deleteReaction(Long postId, Long userId) throws ReactionsNotFoundException {
        try{
            ReactionsEntity reactionsEntity = reactionRepository.findByPostIdAndUserId(postId, userId).isPresent() ?
                                                                reactionRepository.findByPostIdAndUserId(postId, userId).get() : null;
            assert reactionsEntity != null;
            reactionRepository.delete(reactionsEntity);
            return true;
        }
        catch (NoSuchElementException e){
            throw new ReactionsNotFoundException(String.format("Could not found any reaction with id"));
        }
    }
}
