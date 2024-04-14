package com.example.memories.service.implement;

import com.example.memories.entity.PhotoInPostEntity;
import com.example.memories.exeption.PhotoNotFoundException;
import com.example.memories.model.PhotoInPosts;
import com.example.memories.repository.repositoryJPA.PhotoInPostRepository;
import com.example.memories.repository.repositoryJPA.PostsRepository;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.PhotoInPostService;
import com.example.memories.utils.FileUploadUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class PhotoInPostServiceImpl implements PhotoInPostService {
    @Autowired
    private final PhotoInPostRepository photoInPostRepository;
    @Autowired
    private final PostsRepository postsRepository;


    @Override
    public List<PhotoInPosts> getAllPhotoByUserId(Long userId){
            List<PhotoInPostEntity> photoInPostEntities = photoInPostRepository.findAll();
            return photoInPostEntities.stream()
                    .map(
                            photo -> new PhotoInPosts(
                                    photo.getPhotoId(),
                                    photo.getIsHighlight(),
                                    photo.getPhotoUrl(),
                                    photo.getCreateAt(),
                                    photo.getUpdateAt()
                            )
                    ).collect(Collectors.toList());
    }

    @Override
    public PhotoInPosts createPhotoInPost(Long postId, PhotoInPosts photoInPosts, MultipartFile multipartFile) throws IOException{
        try {
            PhotoInPostEntity newPhotoInPost = new PhotoInPostEntity();
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            photoInPosts.setCreateAt(LocalDateTime.now());
            photoInPosts.setUpdateAt(LocalDateTime.now());
            String uploadDir = Paths.get("server/memories/src/main/resources/static")
                    .resolve(Paths.get("post-img"))
                    .resolve(Paths.get(String.valueOf(postId))).toString();
            System.out.println(uploadDir);
            String photoUrl = FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            photoInPosts.setPhotoUrl(photoUrl);

            BeanUtils.copyProperties(photoInPosts, newPhotoInPost);
            photoInPostRepository.save(newPhotoInPost);

            return photoInPosts;
        }
        catch (IOException e){
            throw new IOException(e.getMessage());
        }
    }

    @Override
    public PhotoInPosts updatePhoto(Long id, PhotoInPosts photoInPosts) throws PhotoNotFoundException {
        try {
            PhotoInPostEntity newPhotoInPost = photoInPostRepository.findById(id).isPresent() ? photoInPostRepository.findById(id).get() : null;
            assert newPhotoInPost != null;
            newPhotoInPost.setUpdateAt(LocalDateTime.now());
            newPhotoInPost.setPhotoUrl(photoInPosts.getPhotoUrl());
            photoInPostRepository.save(newPhotoInPost);

            PhotoInPosts updatePhoto = new PhotoInPosts();
            BeanUtils.copyProperties(newPhotoInPost, updatePhoto);
            return updatePhoto;
        }catch (NoSuchElementException e){
            throw new PhotoNotFoundException(String.format("Could not found any photo with id %s", id));
        }
    }

    @Override
    public PhotoInPosts getPhotoById(Long id) throws PhotoNotFoundException {
        try {
            PhotoInPostEntity photoInPostEntity = photoInPostRepository.findById(id).isPresent() ? photoInPostRepository.findById(id).get() : null;
            PhotoInPosts photoInPosts = new PhotoInPosts();
            assert photoInPostEntity != null;
            BeanUtils.copyProperties(photoInPostEntity, photoInPosts);
            return photoInPosts;
        }
        catch (NoSuchElementException e){
            throw new PhotoNotFoundException(String.format("Could not found any photo with Id %s", id));
        }
    }

    @Override
    public Boolean deletePhotoInPost(Long id) throws PhotoNotFoundException {
        try {
            photoInPostRepository.deleteById(id);
            return true;
        }catch (NoSuchElementException e){
            throw new PhotoNotFoundException(String.format("Could not found any photo with Id %s", id));
        }
    }
}
