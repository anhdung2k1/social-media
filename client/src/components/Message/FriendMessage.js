import React,{useEffect} from 'react';
import {Box,Container,Skeleton} from '@mui/material';
import SidebarChat from './components/SidebarChat';
import ListFriendChat from './components/ListFriendChat';
import FriendFeed from './components/FriendFeed';
import {useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getAllRoom} from '../../actions/room';

const FriendMessage = ({user}) => {
    const {isLoading,rooms} = useSelector((state) => state.rooms);
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllRoom(user?.user_id));
    }, [dispatch,user?.user_id,location]);
    if(!rooms) {return 'No rooms found';}
    return (
        isLoading ?
   
   <Container >
            <Box height = 'auto' width = "100%" sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginLeft: '40px'}}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
            </Box>
        </Container>
        :
        <>
        {rooms &&
            <Box display = 'flex' flexDirection = "row" justifyContent = 'space-between' sx = {{height: 'auto',marginTop: '-10px', marginLeft: "-11.2rem"}}>
                <SidebarChat />
                <ListFriendChat user = {user} />
                <Box flex = {4} p={1} sx = {{width: '100%', height: 'auto'}}>
                    { rooms.map((room) => (
                        <FriendFeed key = {room.convId} user = {user} room = {room} />
                    ))
                    }
                </Box>
            </Box>
        }
        </>
    )
}

export default FriendMessage
// import React, { useState, useEffect } from 'react';
// import { Box, Container, Skeleton } from '@mui/material';
// import SidebarChat from './components/SidebarChat';
// import ListFriendChat from './components/ListFriendChat';
// import FriendFeed from './components/FriendFeed';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllRoom } from '../../actions/room';

// const FriendMessage = ({ user }) => {
//   const { isLoading, rooms } = useSelector((state) => state.rooms);
//   const location = useLocation();
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     dispatch(getAllRoom(user?.user_id));
//   }, [dispatch, user?.user_id, location]);
  
//   // Initialize chat messages state
//   const [chatMessages, setChatMessages] = useState([
//     { sender: 'user', message: 'Hey, how are you?' },
//     { sender: 'friend', message: 'I\'m good, thanks! How about you?' }
//   ]);

//   if (!rooms) {
//     return 'No rooms found';
//   }

//   return (
//     isLoading ?
//       <Container>
//         <Box height='auto' width="100%" sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
//           <Skeleton />
//           <Skeleton animation="wave" />
//           <Skeleton animation={false} />
//           <Skeleton />
//           <Skeleton animation="wave" />
//           <Skeleton animation={false} />
//           <Skeleton />
//         </Box>
//       </Container>
//       :
//       <>
//         {rooms &&
//           <Box display='flex' flexDirection="row" justifyContent='space-between' sx={{ height: 'auto', marginTop: '-10px', marginLeft: "-11.2rem" }}>
//             <SidebarChat />
//             <ListFriendChat user={user} />
//             <Box flex={4} p={1} sx={{ width: '100%', height: 'auto' }}>
//               {/* Pass chatMessages as prop to FriendFeed component */}
//               {rooms.map((room) => (
//                 <FriendFeed key={room.convId} user={user} room={room} chatMessages={chatMessages} />
//               ))}
//             </Box>
//           </Box>
//         }
//       </>
//   );
// };

// export default FriendMessage;
