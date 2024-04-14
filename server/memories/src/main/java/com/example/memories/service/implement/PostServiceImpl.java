package com.example.memories.service.implement;

import com.example.memories.builder.PostResponse;
import com.example.memories.entity.*;
import com.example.memories.exeption.PostNotFoundException;
import com.example.memories.model.Posts;
import com.example.memories.repository.repositoryJPA.*;
import com.example.memories.service.interfaces.PostService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    @Autowired
    private PostsRepository postsRepository;
    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private ReactionRepository reactionRepository;
    @Autowired
    private NotificationsRepository notificationsRepository;
    @Autowired
    private PhotoInPostRepository photoInPostRepository;
    @Override
    public PostResponse getAllPosts(int pageNo,int pageSize,String sortBy, String sortDir, String keyword){
            Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            Pageable pageable = PageRequest.of(pageNo-1, pageSize, sort);
            Page<PostsEntity> posts = postsRepository.findAll(pageable);

            List<PostsEntity> listOfPosts = posts.getContent();

            List<Posts> content = listOfPosts.stream().
                    filter(post -> !(post.getPermission().equals("Only me")) || !(post.getIsArchieved() == 0))
                    .map(post ->
                    new Posts(
                            post.getPostId(),
                            post.getContent(),
                            post.getPermission(),
                            post.getUser(),
                            post.getCreateAt(),
                            post.getUpdateAt(),
                            post.getIsArchieved(),
                            post.getPhotoInPost()
                    )
            ).collect(Collectors.toList());
            if(keyword != null) {
                content = content.stream()
                        .filter(subContent -> (subContent.getContent().contains(keyword) || subContent.getUser().getUserName().contains(keyword)))
                        .collect(Collectors.toList());
            }
            PostResponse postResponse = new PostResponse();
            postResponse.setContent(content);
            postResponse.setPageNo(posts.getNumber());
            postResponse.setPageSize(posts.getSize());
            postResponse.setTotalElements(posts.getTotalElements());
            postResponse.setTotalPages(posts.getTotalPages());
            postResponse.setLast(posts.isLast());

            return postResponse;
    }


    @Override
    public List<Posts> getPostByUserId(long userId){
            List<PostsEntity> postsEntity = postsRepository.findAll();

            return postsEntity.stream().
                    filter(post -> post.getUser().getUser_id() == userId).
                    map(
                            post -> new Posts(
                                    post.getPostId(),
                                    post.getContent(),
                                    post.getPermission(),
                                    post.getUser(),
                                    post.getCreateAt(),
                                    post.getUpdateAt(),
                                    post.getIsArchieved(),
                                    post.getPhotoInPost()
                            )
                    ).collect(Collectors.toList());
    }

    @Override
    public Posts createPost(long userID, Posts post) throws Exception {
        try {
            PostsEntity newPost = new PostsEntity();
            assert post!=null;
            //When create a post have an image save to the database
            if(post.getPhotoInPost() != null) {
                if (post.getPhotoInPost().getPhotoUrl().isBlank()) {
                    PhotoInPostEntity photoInPostEntity = new PhotoInPostEntity(post.getPhotoInPost().getPhotoUrl());
                    photoInPostRepository.save(photoInPostEntity);
                    post.setPhotoInPost(photoInPostEntity);
                }
            }
            post.setCreateAt(LocalDateTime.now());
            post.setUpdateAt(LocalDateTime.now());
            if (userRepository.findById(userID).isPresent()) {
                post.setUser(userRepository.findById(userID).get());
            }
            BeanUtils.copyProperties(post, newPost);
            postsRepository.save(newPost);
            return post;
        }
        catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Posts updatePost(long id, Posts post) throws PostNotFoundException{
        if(postsRepository.findById(id).isPresent()) {
            PostsEntity newPost = postsRepository.findById(id).get();
            newPost.setContent(post.getContent());
            newPost.setUpdateAt(LocalDateTime.now());
            if(post.getPhotoInPost() != null && post.getPhotoInPost().getPhotoUrl() != null){
                PhotoInPostEntity photoInPostEntity = new PhotoInPostEntity(post.getPhotoInPost().getPhotoUrl());
                photoInPostRepository.save(photoInPostEntity);
                newPost.setPhotoInPost(photoInPostEntity);
            }
            postsRepository.save(newPost);
            Posts updatePostResponse = new Posts();
            BeanUtils.copyProperties(newPost, updatePostResponse);
            return updatePostResponse;
        }
        else{
            throw new PostNotFoundException(String.format("Could not found any post with Id %s", id));
        }
    }

    @Override
    public Posts updateAudiencePost(long id, Posts post) throws PostNotFoundException {
        if(postsRepository.findById(id).isPresent()){
                PostsEntity newPost = postsRepository.findById(id).get();
                newPost.setPermission(post.getPermission());
                postsRepository.save(newPost);
                Posts updatePostResponse = new Posts();
                BeanUtils.copyProperties(newPost, updatePostResponse);
                return updatePostResponse;
        }
        else {
            throw new PostNotFoundException(String.format("Could not found any post with Id %s", id));
        }
    }

    @Override
    public Posts getPostById(long id) throws PostNotFoundException{
        try {
            PostsEntity postsEntity = postsRepository.findById(id).isPresent() ? postsRepository.findById(id).get() : null;
            Posts post = new Posts();
            assert postsEntity != null;
            BeanUtils.copyProperties(postsEntity, post);
            return post;
        }
        catch (NoSuchElementException e){
            throw new PostNotFoundException(String.format("Could not found any post with Id %s", id));
        }
    }

    @Override
    public Boolean deletePostById(long postId) throws PostNotFoundException{
        try {
            PostsEntity postsEntity = postsRepository.findById(postId).isPresent() ? postsRepository.findById(postId).get() : null;
            assert postsEntity != null;
            // If the post has List of comments -> need delete all -> release constraint
            List<CommentsEntity> commentsEntity = commentsRepository.findAllByPost(postsEntity);
            if(!commentsEntity.isEmpty()){
                commentsRepository.deleteAll(commentsEntity);
            }
            // If contains photo --> Delete that image
            PhotoInPostEntity photoInPostEntity = photoInPostRepository.findById(postsEntity.getPhotoInPost().getPhotoId()).isPresent() ? photoInPostRepository.findById(postsEntity.getPhotoInPost().getPhotoId()).get() : null;
            if(photoInPostEntity != null){
                photoInPostRepository.delete(photoInPostEntity);
            }
            //Delete all the notifications related to that post
            List<NotificationsEntity> notificationsEntities = notificationsRepository.findAllByPost(postsEntity).isPresent() ? notificationsRepository.findAllByPost(postsEntity).stream().toList() : null;
            if(notificationsEntities != null){
                notificationsRepository.deleteAll(notificationsEntities);
            }
            //Delete all the reactions related to that post
            List<ReactionsEntity> reactionsEntities = reactionRepository.findAllByPost(postsEntity).isPresent() ? reactionRepository.findAllByPost(postsEntity).stream().toList() : null;
            if(reactionsEntities != null){
                reactionRepository.deleteAll(reactionsEntities);
            }
            postsEntity.setUser(null);
            postsRepository.delete(postsEntity);
            return true;
        }
        catch (NoSuchElementException e){
            throw new PostNotFoundException(String.format("Could not find any post within ID,%d", postId));
        }
    }
    @Override
    public Long countPost() {
        return postsRepository.countAllPosts();
    }

    @Override
    public Long countPostByMonth(String startDate, String endDate) {
        return postsRepository.countPostsByMonth(startDate, endDate);
    }
}
