package com.example.memories.controller;
import com.example.memories.constant.SpringBootApplicationConstant;
import com.example.memories.exeption.FriendRequestsNotFoundException;
import com.example.memories.model.FriendRequests;
import com.example.memories.service.interfaces.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FriendRequestController {
    @Autowired
    FriendRequestService friendRequestService;
    @GetMapping("/friendrequests")
    public ResponseEntity<List<FriendRequests>> getAllFriendRequest(
            @RequestParam(value = "keyword",defaultValue = SpringBootApplicationConstant.DEFAULT_PAGE_KEYWORD,required = false) String keyword
    ){
        return ResponseEntity.ok().body(friendRequestService.getAllFriendRequests(keyword));
    }

    @GetMapping("/friendrequests/{id}")
    public ResponseEntity<FriendRequests> getFriendRequestById(@PathVariable long id){
        return ResponseEntity.ok().body(friendRequestService.getFriendRequestById(id));
    }

    @GetMapping("/user/{userid}/friendrequests/sendUserId")
    public ResponseEntity<List<FriendRequests>> getSendUserFriendRequest(@PathVariable long userid){
        return ResponseEntity.ok().body(friendRequestService.getFriendRequestsBySendUserId(userid));
    }
    @GetMapping("/user/{userid}/friendrequests/receiveUserId")
    public ResponseEntity<List<FriendRequests>> getReceiveUserFriendRequest(@PathVariable long userid){
        return ResponseEntity.ok().body(friendRequestService.getFriendRequestsByReceiveUserId(userid));
    }
    @PostMapping("user/{userId}/friendrequests")
    public ResponseEntity<FriendRequests> createFriendRequest(@PathVariable long userId,@RequestBody FriendRequests friendRequests) throws Exception {
        return ResponseEntity.ok().body(friendRequestService.createFriendRequest(userId, friendRequests));
    }

    @PutMapping("/friendrequest/{id}")
    public ResponseEntity<FriendRequests> updateFriendRequest(@PathVariable long id,@RequestBody FriendRequests friendRequest) throws FriendRequestsNotFoundException {
        return ResponseEntity.ok().body(friendRequestService.updateFriendRequest(id, friendRequest));
    }

    @DeleteMapping("/friendrequest/{id}")
    public ResponseEntity<Boolean> deleteFriendRequest(@PathVariable long id) throws FriendRequestsNotFoundException {
        return ResponseEntity.ok().body(friendRequestService.deleteFriendRequest(id));
    }

    @PutMapping("/friendrequest/{id}/accept")
    public ResponseEntity<Boolean> setAccept(@PathVariable long id) throws FriendRequestsNotFoundException {
        return ResponseEntity.ok().body(friendRequestService.acceptFriendRequest(id));
    }

    @PutMapping("/friendrequest/{id}/unfriend")
    public ResponseEntity<Boolean> cancelFriendRequest(@PathVariable long id) throws FriendRequestsNotFoundException {
        return ResponseEntity.ok().body(friendRequestService.cancelFriendRequest(id));
    }

}
