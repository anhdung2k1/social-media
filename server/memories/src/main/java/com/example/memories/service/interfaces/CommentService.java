package com.example.memories.service.interfaces;

import com.example.memories.exeption.CommentNotFoundException;
import com.example.memories.model.Comments;

import java.util.List;

public interface CommentService {
    Comments createComment(long postId,long userId,Comments comments) throws Exception;
    List<Comments> getAllCommentsPost(long postId);
    Comments getCommentById(Long id);
    Comments updateComment(Long id, Comments comments) throws CommentNotFoundException;
    boolean deleteComment(Long id) throws CommentNotFoundException;
}

