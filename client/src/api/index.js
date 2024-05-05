import axios from 'axios';

//API hosting back-end server
const API = axios.create({baseURL: 'http://localhost:8080/api'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//FriendRequests
export const fetchSendUserFriendRequest = (userId) => API.get(`/user/${userId}/friendrequests/sendUserId`);
export const fetchReceiveUserFriendRequest = (userId) => API.get(`/user/${userId}/friendrequests/receiveUserId`);
export const fetchAllFriendRequests = () => API.get(`/friendrequests`)
export const acceptUserFriendRequest = (id) => API.put(`/friendrequest/${id}/accept`); 
export const deleteFriendRequest = (id) => API.delete(`/friendrequest/${id}`);
export const createFriendRequest = (userId,formData) => API.post(`user/${userId}/friendrequests`,formData);

//User
export const createUser = (user) => API.post('/users',user); // OK
export const fetchUsers = () => API.get('/users'); // OK
export const fetchUser = (id) => API.get(`/users/${id}`); // OK
export const deleteUser = (id) => API.delete(`/users/${id}`); // OK
export const updateUser = (user,id) => API.put(`/users/${id}`,user); // OK
//Posts
export const fetchPostByUserId = (userId) => API.get(`/${userId}/posts`); //OK
export const fetchPost = (id) => API.get(`/posts/${id}`); // OK
export const fetchPosts = (page) => API.get(`/posts?pageNo=${page}`); // OK
export const fetchPostsBySearch = (keyword) => API.get(`/posts?keyword=${keyword}`); // OK
export const createPost = (user_id, newPost) => API.post(`/${user_id}/posts`, newPost); // OK 
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, {value}); // OK
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost); // OK
export const updateAudiencePost = (id,updatedPost) => API.put(`/posts/${id}/audience`,updatedPost); // OK
export const deletePost = (id) => API.delete(`/posts/${id}`); // OK

//Reactions
export const createLike = (userId,newLike) => API.post(`/user/${userId}/reactions`,newLike); // To-do
export const fetchAllLike = () => API.get(`/reactions`);
export const fetchAllLikePost = (postId) => API.get(`/post/${postId}/reactions`);
export const fetchAllLikeComment = (commentId) => API.get(`/comment/${commentId}/reactions`);
export const updateLike = (id,updatedLike) => API.put(`/reactions/${id}`,updatedLike);
export const deleteLike = (postId, userId) => API.delete(`/reactions/post/${postId}/user/${userId}`);
//Comment
export const fetchCommentByPostId = (postId) => API.get(`/post/${postId}/comments`); // OK
export const createCommentByUserId = (userId,postId,newComment) => API.post(`/user/${userId}/comments/${postId}`,newComment); //OK
export const updateComment = (id,updatedComment) => API.put(`/comments/${id}`,updatedComment);
export const deleteComment = (id) => API.delete(`/comments/${id}`);

//Notifications
export const fetchNotifications = () => API.get(`/notifications`);
export const fetchNotificationsByUserId = (userId) => API.get(`/user/${userId}/notifications`);
export const fetchNotificationById = (id) => API.get(`/notifications/${id}`);
export const createNotification = (userId,newNotification) => API.post(`/user/${userId}/notifications`,newNotification);
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);

//SearchRecents
export const fetchSearchRecents = () => API.get(`/searchrecents`); // OK
export const fetchSearchRecentsByUserId = (userId) => API.get(`/user/${userId}/searchrecents`); //OK
export const createSearchRecent = (userId,newSearch) => API.post(`/user/${userId}/searchrecents`,newSearch);//OK
export const updateSearch = (userId,updatedSearch) => API.put(`/user/${userId}/searchrecents`,updatedSearch);
export const deleteSearch = (id) => API.delete(`/searchrecents/${id}`);
//Authentication
export const signin = (formData) => API.post('accounts/signin',formData); // OK
export const signup = (formData) => API.post('accounts/signup',formData); // OK

//Chat
export const fetchMessageRoom = (roomId) => API.get(`/room/${roomId}/messages`);

//export const fetchMessageRoom = (roomId) => API.get(`/room/${roomId}/messages`,{roomId});
export const createMessage = (userId,roomId,newMessage) => API.post(`/user/${userId}/room/${roomId}/messages`,newMessage);
export const updateMessage = (messId, updatedMessage) => API.put(`/messages/${messId}`,updatedMessage);
export const deleteMessage = (messId) => API.delete(`/messages/${messId}`);

//Room
export const getAllRoom = (sendUserId) => API.get(`/sendUser/${sendUserId}/room`);
export const getRoom = (roomId) => API.get(`/room/${roomId}`); // To-do
export const createRoom = (userId,roomId, newRoom) => API.post(`/user/${userId}/room`,newRoom); //To-do
export const deleteRoom = (roomId) => API.delete(`/room/${roomId}`); //To-do


