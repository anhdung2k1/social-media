package com.example.memories.service.interfaces;

import com.example.memories.exeption.PhotoNotFoundException;
import com.example.memories.model.PhotoInPosts;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface PhotoInPostService {
    List<Map<String, Object>> getAllPhotoByUserId(Long userId);
    PhotoInPosts createPhotoInPost(String fileBase64, Long userId) throws IOException;
    PhotoInPosts updatePhoto(Long id, String fileBase64) throws PhotoNotFoundException;
    Map<String, Object> getPhotoById(Long id) throws PhotoNotFoundException;
    Boolean deletePhotoInPost(Long id) throws PhotoNotFoundException;
}
