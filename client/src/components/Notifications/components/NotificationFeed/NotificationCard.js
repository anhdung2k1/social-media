import React,{useState} from 'react';
import {Button,Dialog,DialogContent,DialogTitle,DialogActions,Stack,Box, Avatar, Typography,ButtonBase} from '@mui/material';
import notificationType from '../../../../constants/NotificationType';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {deleteNotification} from '../../../../actions/notifications';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const NotificationCard = ({notification,user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleDelete = (e) => {
    dispatch(deleteNotification(Number(notification.notificationId)));
  }
  return (
    <>
    {notification.user !== null && (user.user_id !== notification.user.user_id) && 
      <Box width = "750px" height = "100px" margin = "15px 20px" sx = {{background: 'whitesmoke',border :"1px solid whitesmoke", borderRadius: '10px'}}>
            <Stack direction = "row" gap = "20px" marginTop = '20px' marginLeft = '10px'>
            <ButtonBase onClick = {() => navigate(`/posts/${notification.post.postId}`)}>
              <Avatar alt ="avatar" src = {notification.user.avatar_url}/>
              <Stack direction = "column">
                  <Typography>{notification.user.userName} {notificationType(notification.notiType)}</Typography>
                  <Typography variant = 'bodyText3' color = "primary" sx = {{display: 'flex',alignItems: 'start'}}>a day ago</Typography>
              </Stack>
              </ButtonBase>
              <ButtonBase onClick = {handleOpen}>
                <MoreHorizIcon />
              </ButtonBase>
              <Dialog open = {open} onClose = {handleClose}>
                <DialogTitle>
                  Delete Notification
                </DialogTitle>
                <DialogContent>
                  Are you sure to remove this notification
                </DialogContent>
                <DialogActions>
                  <Button variant = "text" onClick = {handleClose}>
                    Cancel
                  </Button>
                  <Button variant = "contained" onClick = {handleDelete}>
                    Delete Notification
                  </Button>
                </DialogActions>
              </Dialog>
          </Stack>
      </Box>

    }</>
  )
}

export default NotificationCard
