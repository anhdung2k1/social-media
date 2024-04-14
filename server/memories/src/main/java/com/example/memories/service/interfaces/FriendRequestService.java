package com.example.memories.service.interfaces;

import com.example.memories.exeption.FriendRequestsNotFoundException;
import com.example.memories.model.FriendRequests;

import java.util.List;

public interface FriendRequestService {
    List<FriendRequests> getAllFriendRequests(String keyword);
    FriendRequests getFriendRequestById(long id);
    List<FriendRequests> getFriendRequestsBySendUserId(long userId);
    List<FriendRequests> getFriendRequestsByReceiveUserId(long userId);
    FriendRequests createFriendRequest(long userId, FriendRequests request) throws Exception;
    FriendRequests updateFriendRequest(long id, FriendRequests request) throws FriendRequestsNotFoundException;
    Boolean deleteFriendRequest(long id) throws FriendRequestsNotFoundException;
    boolean acceptFriendRequest(long id) throws FriendRequestsNotFoundException;
    boolean cancelFriendRequest(long id) throws FriendRequestsNotFoundException;
}
