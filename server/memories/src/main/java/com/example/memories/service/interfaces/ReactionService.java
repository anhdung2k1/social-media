package com.example.memories.service.interfaces;

import com.example.memories.exeption.ReactionsNotFoundException;
import com.example.memories.model.Reactions;

import java.util.List;

public interface ReactionService {
    Reactions createReaction(Long userId,Reactions reactions) throws Exception;
    List<Reactions> getAllReactions();
    List<Reactions> getAllReactionsByPostId(Long postId);
    List<Reactions> getAllReactionsByCommentId(Long commentId);
    Reactions getReactionById(Long id) throws ReactionsNotFoundException;
    Reactions updateReaction(Long id, Reactions reactions) throws ReactionsNotFoundException;
    Boolean deleteReaction(Long postId,Long userId) throws ReactionsNotFoundException;
}
