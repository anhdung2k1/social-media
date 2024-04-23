import React,{useEffect} from 'react';
import {Box} from '@mui/material';
import {useDispatch} from 'react-redux';
import SidebarChat from './components/SidebarChat';
import ChatFeed from './components/ChatFeed';
import ListFriendChat from './components/ListFriendChat';
import {useLocation,useParams} from 'react-router-dom';
import {getAllRoom} from '../../actions/room';
import {getMessageRoom} from '../../actions/chat';
import {getUser} from '../../actions/users';

const Message = ({user,userProfile}) => {
  const {id} = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessageRoom(id));
    dispatch(getAllRoom(user?.user_id));
    dispatch(getUser(user?.user_id));
  }, [dispatch, user?.user_id, location, id]);
  return (
    <Box display = 'flex' flexDirection = "row" justifyContent = 'space-between' sx = {{height: 'auto',marginTop: '-10px', marginLeft: "-11.2rem"}}>
      <SidebarChat />
      <ListFriendChat user = {user} />
      <ChatFeed userProfile = {userProfile}/>
    </Box>
  )
}

export default Message
// import React, { useState, useEffect } from 'react';
// import { Box } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import SidebarChat from './components/SidebarChat';
// import ChatFeed from './components/ChatFeed';
// import ListFriendChat from './components/ListFriendChat';
// import { useLocation, useParams } from 'react-router-dom';
// import { getAllRoom } from '../../actions/room';
// import { getMessageRoom } from '../../actions/chat';
// import { getUser } from '../../actions/users';

// const Message = ({ user, userProfile }) => {
//   const { id } = useParams();
//   const location = useLocation();
//   const dispatch = useDispatch();
  
//   // Initialize chat messages state
//   const [chatMessages, setChatMessages] = useState([
//     { sender: 'user', message: 'Hey, how are you?' },
//     { sender: 'friend', message: 'I\'m good, thanks! How about you?' }
//   ]);

//   useEffect(() => {
//     dispatch(getMessageRoom(id));
//     dispatch(getAllRoom(user?.user_id));
//     dispatch(getUser(user?.user_id));
//   }, [dispatch, user?.user_id, location, id]);

//   return (
//     <Box display='flex' flexDirection="row" justifyContent='space-between' sx={{ height: 'auto', marginTop: '-10px', marginLeft: "-11.2rem" }}>
//       <SidebarChat />
//       <ListFriendChat user={user} />
//       {/* Pass chatMessages as prop to ChatFeed component */}
//       <ChatFeed chatMessages={chatMessages} userProfile={userProfile} />
//     </Box>
//   );
// };

// export default Message;
