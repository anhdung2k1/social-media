package com.example.memories.service.implement;

import com.amazonaws.services.s3.AmazonS3;
import com.example.memories.entity.PhotoInPostEntity;
import com.example.memories.entity.UsersEntity;
import com.example.memories.exeption.PhotoNotFoundException;
import com.example.memories.model.PhotoInPosts;
import com.example.memories.repository.repositoryJPA.PhotoInPostRepository;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.PhotoInPostService;
import com.example.memories.utils.ImageBase64File;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class PhotoInPostServiceImpl implements PhotoInPostService {
    private final PhotoInPostRepository photoInPostRepository;
    private final UsersRepository usersRepository;

    @Value("${bucket.name}")
    public String bucketName;
    @Autowired
    public AmazonS3 s3Client;

    private final ImageBase64File imageBase64File;

    private Map<String, Object> photoMap(PhotoInPostEntity photoInPostEntity){
        return new HashMap<>() {{
           put("photoId", photoInPostEntity.getPhotoId());
           put("photoUrl", photoInPostEntity.getPhotoUrl());
           put("photoOwner", photoInPostEntity.getUsers().getUserName());
           put("photoHighlight", photoInPostEntity.getIsHighlight());
        }};
    }
    @Override
    public List<Map<String, Object>> getAllPhotoByUserId(Long userId){
        List<Map<String, Object>> photoMapList = new ArrayList<>();
        List<PhotoInPostEntity> photoInPostEntities = photoInPostRepository.findAllPhotosByUserId(userId);
        photoInPostEntities.forEach((photoInPostEntity -> photoMapList.add(photoMap(photoInPostEntity))));
        return photoMapList;
    }

    @Override
    public PhotoInPosts createPhotoInPost(String fileBase64, Long userId) throws IOException{
        URL objectURL = imageBase64File.handleBase64Image(fileBase64);
        PhotoInPostEntity newPhotoInPost = new PhotoInPostEntity();
        UsersEntity usersEntity = usersRepository.findById(userId).isPresent() ?
                usersRepository.findById(userId).get() : null;
        assert usersEntity != null;
        newPhotoInPost.setPhotoUrl(objectURL.toString());
        newPhotoInPost.setUsers(usersEntity);
        newPhotoInPost.setCreateAt(LocalDateTime.now());
        newPhotoInPost.setUpdateAt(LocalDateTime.now());

        PhotoInPosts photoInPosts = new PhotoInPosts();
        BeanUtils.copyProperties(newPhotoInPost, photoInPosts);
        photoInPostRepository.save(newPhotoInPost);
        return photoInPosts;
    }

    @Override
    public PhotoInPosts updatePhoto(Long id, String fileBase64) throws PhotoNotFoundException {
        try {
            PhotoInPostEntity newPhotoInPost = photoInPostRepository.findById(id).isPresent() ? photoInPostRepository.findById(id).get() : null;
            assert newPhotoInPost != null;
            newPhotoInPost.setUpdateAt(LocalDateTime.now());

            URL objectURL = imageBase64File.handleBase64Image(fileBase64);
            newPhotoInPost.setPhotoUrl(objectURL.toString());
            photoInPostRepository.save(newPhotoInPost);

            PhotoInPosts updatePhoto = new PhotoInPosts();
            BeanUtils.copyProperties(newPhotoInPost, updatePhoto);
            return updatePhoto;
        }catch (NoSuchElementException e){
            throw new PhotoNotFoundException(String.format("Could not found any photo with id %s", id));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Map<String, Object> getPhotoById(Long id) throws PhotoNotFoundException {
        try {
            PhotoInPostEntity photoInPostEntity = photoInPostRepository.findById(id).isPresent() ? photoInPostRepository.findById(id).get() : null;
            assert photoInPostEntity != null;
            return photoMap(photoInPostEntity);
        }
        catch (NoSuchElementException e){
            throw new PhotoNotFoundException(String.format("Could not found any photo with Id %s", id));
        }
    }

    @Override
    public Boolean deletePhotoInPost(Long id) throws PhotoNotFoundException {
        try {
            if (photoInPostRepository.findById(id).isPresent()) {
                String fileURI = photoInPostRepository.findById(id).get().getPhotoUrl();
                String[] fileURISplitted = fileURI.split("/");
                log.info("fileURISplitted: {}", (Object) fileURISplitted);
                String fileName = fileURISplitted[fileURISplitted.length-1];
                log.info("FileName: {}", fileName);
                s3Client.deleteObject(bucketName, fileName);
                log.info("FileName: {} removed", fileName);
            }
            photoInPostRepository.deleteById(id);
            log.info("{} photo ID removed", id);
            return true;
        }catch (NoSuchElementException e){
            throw new PhotoNotFoundException(String.format("Could not found any photo with Id %s", id));
        }
    }
}
