import React from 'react';
import {Box,Avatar,Typography} from '@mui/material';
import Online from '../../../assets/icons/online.png';
import {useNavigate} from 'react-router-dom';
// const FriendFeed = ({user,room}) => {
//   const navigate = useNavigate();
//   return (
//     <>
//     {user.user_id === room.sendUser.user_id ?
//     <Box display = 'flex' flexDirection = 'row' onClick = {() => navigate(`/message/${room.convId}`)} alignItems = 'center' gap = '20px' margin = '15px 20px 5px' sx = {{background: 'white', borderRadius: 2, width: '90%', height: '80px',boxShadow: 'rgba(50,20,250, 0.3) 0px 7px 29px 0px','&:hover': {background: 'whitesmoke'}, cursor: 'pointer'}}>
//         <Avatar alt = "avatar_img" src = {room.receiveUser.avatar_url} sx = {{width: '60px', height: '60px', objectFit: 'cover', marginLeft: 2}}/>
//             <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
//                 <Typography>{room.receiveUser.userName}</Typography>
//                 <div style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
//                     <img alt = 'icon' src = {Online} width = '15px' height = '15px'/>
//                     <Typography variant = 'body2'>Online</Typography>
//                 </div>
//             </div>
//     </Box>
//     :
//     <Box display = 'flex' flexDirection = 'row' onClick = {() => navigate(`/message/${room.convId}`)} alignItems = 'center' gap = '20px' margin = '15px 20px 5px' sx = {{background: 'white', borderRadius: 2, width: '90%', height: '80px',boxShadow: 'rgba(50,20,250, 0.3) 0px 7px 29px 0px','&:hover': {background: 'whitesmoke'}, cursor: 'pointer'}}>
//         <Avatar alt = "avatar_img" src = {room.sendUser.avatar_url} sx = {{width: '60px', height: '60px', objectFit: 'cover', marginLeft: 2}}/>
//             <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
//                 <Typography>{room.sendUser.userName}</Typography>
//                 <div style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
//                     <img alt = 'icon' src = {Online} width = '15px' height = '15px'/>
//                     <Typography variant = 'body2'>Online</Typography>
//                 </div>
//             </div>
//     </Box>
//     }
//     </>
//   )
// }


// Modify FriendFeed Component
const FriendFeed = ({ user, room }) => {
    const navigate = useNavigate();
  
    // Define default friend here
    const defaultFriend = {
      user_id: '0',
      userName: 'Default Friend',
      avatar_url: 'path_to_default_avatar_image.jpg',
    };
    return (
      <>
        {user.user_id === room.sendUser.user_id ?
          <Box display='flex' flexDirection='row' onClick={() => navigate(`/message/${room.convId}`)} alignItems='center' gap='20px' margin='15px 20px 5px' sx={{ background: 'white', borderRadius: 2, width: '90%', height: '80px', boxShadow: 'rgba(50,20,250, 0.3) 0px 7px 29px 0px', '&:hover': { background: 'whitesmoke' }, cursor: 'pointer' }}>
            <Avatar alt="avatar_img" src={room.receiveUser ? room.receiveUser.avatar_url : defaultFriend.avatar_url} sx={{ width: '60px', height: '60px', objectFit: 'cover', marginLeft: 2 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <Typography>{room.receiveUser ? room.receiveUser.userName : defaultFriend.userName}</Typography>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <img alt='icon' src={Online} width='15px' height='15px' />
                <Typography variant='body2'>Online</Typography>
              </div>
            </div>
          </Box>
          :
          <Box display='flex' flexDirection='row' onClick={() => navigate(`/message/${room.convId}`)} alignItems='center' gap='20px' margin='15px 20px 5px' sx={{ background: 'white', borderRadius: 2, width: '90%', height: '80px', boxShadow: 'rgba(50,20,250, 0.3) 0px 7px 29px 0px', '&:hover': { background: 'whitesmoke' }, cursor: 'pointer' }}>
            <Avatar alt="avatar_img" src={room.sendUser ? room.sendUser.avatar_url : defaultFriend.avatar_url} sx={{ width: '60px', height: '60px', objectFit: 'cover', marginLeft: 2 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <Typography>{room.sendUser ? room.sendUser.userName : defaultFriend.userName}</Typography>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <img alt='icon' src={Online} width='15px' height='15px' />
                <Typography variant='body2'>Online</Typography>
              </div>
            </div>
          </Box>
        }
      </>
    );
  };
  
export default FriendFeed
