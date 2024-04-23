// import React from 'react';
// import {Paper,Typography,Avatar,Box,IconButton} from '@mui/material';
// import Emotion from '../../../assets/icons/emotion_message.png';
// import Reply from '../../../assets/icons/reply_message.png';
// import More from '../../../assets/icons/expand_message.png';

// const MessageCard = ({message,user}) => {

//   return (
//     <Paper sx = {{display: 'flex',justifyContent: 'space-between', flexDirection: 'row', height: 80, alignItems: 'center', marginTop: 1}}>
//         {message?.sender?.user_id === user?.user_id ?
//         <>
//         <Box sx = {{display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2, marginBottom: 2}}>
//             <Avatar alt = "avt_img" src = {message?.sender?.avatar_url} sx = {{marginLeft: 4}}/>
//             <div>
//                 <Typography variant = "body2" fontSize = "18px">{message?.sender?.userName}</Typography>
//                 <Typography variant = "body2">{message?.message}</Typography>
//             </div>
//         </Box>
//         <Box height = '32px' width = '120px' sx = {{display: 'flex',justifyContent: 'center', alignItems: 'center',background: '#D9D9D9',borderRadius: 30, gap: 1, position: 'static', marginTop: -4, marginRight: 2}}>
//             <IconButton onClick = {null}>
//                 <img alt = "icon" src = {Emotion} height = '20px'/>
//             </IconButton>
//             <IconButton onClick = {null}>
//                 <img alt = "icon" src = {Reply} height = '20px'/>
//             </IconButton>
//             <IconButton onClick = {null}>
//                 <img alt = "icon" src = {More} height = '20px'/>
//             </IconButton>
//         </Box>
//         </>
//         :
//         <>     
//         <Box height = '32px' width = '120px' sx = {{display: 'flex',justifyContent: 'center', alignItems: 'center',background: '#D9D9D9',borderRadius: 30, gap: 1, position: 'static', marginTop: -4, marginLeft: 2}}>
//             <IconButton onClick = {null}>
//                 <img alt = "icon" src = {Emotion} height = '20px'/>
//             </IconButton>
//             <IconButton onClick = {null}>
//                 <img alt = "icon" src = {Reply} height = '20px'/>
//             </IconButton>
//             <IconButton onClick = {null}>
//                 <img alt = "icon" src = {More} height = '20px'/>
//             </IconButton>
//         </Box>
//         <Box sx = {{display: 'flex', flexDirection: 'row', gap: 2,marginTop: 2, marginBottom: 2}}>
//             <div>
//                 <Typography variant = "body2" fontSize = "18px" sx = {{display: 'flex', justifyContent: 'end'}}>{message?.sender?.userName}</Typography>
//                 <Typography variant = "body2">{message?.message}</Typography>
//             </div>
//             <Avatar alt = "avt_img" src = {message?.sender?.avatar_url} sx = {{marginRight: 4}}/>
//         </Box>
//         </>
//         }
//     </Paper>
//   )
// }

// export default MessageCard
import React from 'react';
import { Paper, Typography, Avatar, Box, IconButton } from '@mui/material';
import Emotion from '../../../assets/icons/emotion_message.png';
import Reply from '../../../assets/icons/reply_message.png';
import More from '../../../assets/icons/expand_message.png';

const MessageCard = ({ message, user }) => {
  const defaultFriend = {
    user_id: '0',
    userName: 'Default Friend',
    avatar_url: 'path_to_default_avatar_image.jpg',
  };

  const sender = message?.sender || defaultFriend;

  const isCurrentUser = sender.user_id === user?.user_id;

  return (
    <Paper sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height: 80, alignItems: 'center', marginTop: 1 }}>
      {isCurrentUser ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2, marginBottom: 2 }}>
            <Avatar alt="avt_img" src={sender.avatar_url} sx={{ marginLeft: 4 }} />
            <div>
              <Typography variant="body2" fontSize="18px">{sender.userName}</Typography>
              <Typography variant="body2">{message?.message}</Typography>
            </div>
          </Box>
          <Box height="32px" width="120px" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#D9D9D9', borderRadius: 30, gap: 1, position: 'static', marginTop: -4, marginRight: 2 }}>
            <IconButton onClick={null}>
              <img alt="icon" src={Emotion} height="20px" />
            </IconButton>
            <IconButton onClick={null}>
              <img alt="icon" src={Reply} height="20px" />
            </IconButton>
            <IconButton onClick={null}>
              <img alt="icon" src={More} height="20px" />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <Box height="32px" width="120px" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#D9D9D9', borderRadius: 30, gap: 1, position: 'static', marginTop: -4, marginLeft: 2 }}>
            <IconButton onClick={null}>
              <img alt="icon" src={Emotion} height="20px" />
            </IconButton>
            <IconButton onClick={null}>
              <img alt="icon" src={Reply} height="20px" />
            </IconButton>
            <IconButton onClick={null}>
              <img alt="icon" src={More} height="20px" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2, marginBottom: 2 }}>
            <div>
              <Typography variant="body2" fontSize="18px" sx={{ display: 'flex', justifyContent: 'end' }}>{sender.userName}</Typography>
              <Typography variant="body2">{message?.message}</Typography>
            </div>
            <Avatar alt="avt_img" src={sender.avatar_url} sx={{ marginRight: 4 }} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default MessageCard;
