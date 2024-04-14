package com.example.memories.service.interfaces;

import com.example.memories.exeption.PhotoNotFoundException;
import com.example.memories.model.PhotoInPosts;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PhotoInPostService {
    public List<PhotoInPosts> getAllPhotoByUserId(Long userId);
    PhotoInPosts createPhotoInPost(Long postId, PhotoInPosts photoInPosts, MultipartFile multipartFile)throws IOException;
    PhotoInPosts updatePhoto(Long id, PhotoInPosts photoInPosts) throws PhotoNotFoundException;
    PhotoInPosts getPhotoById(Long id) throws PhotoNotFoundException;
    Boolean deletePhotoInPost(Long id) throws PhotoNotFoundException;
}
