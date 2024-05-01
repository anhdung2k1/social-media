import React from 'react';
import { Paper, Typography, Avatar, Box, IconButton } from '@mui/material';
import Emotion from '../../../assets/icons/emotion_message.png';
import Reply from '../../../assets/icons/reply_message.png';
import More from '../../../assets/icons/expand_message.png';

const MessageCard = ({ message, user }) => {
  const sender = message?.sender;
  const isCurrentUser = sender.user_id === user?.user_id;

  const currentUserStyles = {
    backgroundColor: '#dcf8c6',  // Light green background for current user
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    borderRadius: '20px',
    padding: '8px 16px'
  };

  const otherUserStyles = {
    backgroundColor: '#ffffff',  // White background for other users
    justifyContent: 'flex-start',
    marginRight: 'auto',
    borderRadius: '20px',
    padding: '8px 16px'
  };

  return (
    <Paper elevation={0} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
      overflow: 'hidden',
      border: 0,
      backgroundColor: 'transparent'
    }}>
      <Box sx={isCurrentUser ? currentUserStyles : otherUserStyles}>
        <Avatar alt="Avatar Image" src={sender.avatar_url} sx={{ width: 32, height: 32, marginRight: 2 }} />
        <div>
          <Typography variant="caption" display="block" sx={{ fontSize: 12, color: 'gray' }}>{sender.userName}</Typography>
          <Typography variant="body2" sx={{ fontSize: 14 }}>{message?.message}</Typography>
        </div>
      </Box>
      <Box sx={{
        display: 'flex',
        gap: 1,
        marginTop: 1,
        marginBottom: 1,
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start'
      }}>
        <IconButton size="small">
          <img alt="Like icon" src={Emotion} style={{ width: 24, height: 24 }} />
        </IconButton>
        <IconButton size="small">
          <img alt="Reply icon" src={Reply} style={{ width: 24, height: 24 }} />
        </IconButton>
        <IconButton size="small">
          <img alt="More options icon" src={More} style={{ width: 24, height: 24 }} />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default MessageCard;
